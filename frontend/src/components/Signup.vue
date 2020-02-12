<template>
  <v-container>
    <v-layout
      row
      wrap
    >
      <v-spacer />
      <v-flex xs6>
        <v-alert
          style="width: 500px"
          v-model="alertSuccess"
          type="success"
          dismissible
          transition="scale-transition"
        >
          {{alertMsg}}
        </v-alert>
        <v-alert
          style="width: 500px"
          v-model="alertFail"
          type="error"
          dismissible
          transition="scale-transition"
        >
          {{alertMsg}}
        </v-alert>
        <v-card
          class="mx-auto"
          style="max-width: 500px;"
        >
          <v-system-bar
            color="deep-purple darken-4"
            dark
          />
          <v-toolbar
            color="deep-purple accent-4"
            cards
            dark
            flat
          >
            <v-card-title class="title font-weight-regular">Create Account</v-card-title>
          </v-toolbar>
          <v-form
            ref="form"
            class="pa-3 pt-4"
          >
            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDateFormatted"
                  label="Start Training Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                required
                @blur="$v.startDate.$touch()"
                @change="$v.startDate.$touch()"
                :error-messages="startDateErrors"
                v-model="startDate"
                color="deep-purple"
                label="Training start date"
              />
            </v-menu>

            <v-menu
              :close-on-content-click="false"
              :nudge-right="40"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDateFormatted"
                  label="End Training Date"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                required
                @blur="$v.endDate.$touch()"
                @change="$v.endDate.$touch()"
                :error-messages="endDateErrors"
                v-model="endDate"
                color="deep-purple"
                label="Training end date"
              />
            </v-menu>

            <v-select
              required
              @blur="$v.cadre.$touch()"
              @change="$v.cadre.$touch()"
              :error-messages="cadreErrors"
              v-model="cadre"
              color="deep-purple"
              label="Cadre"
              :items="cadres"
            />

            <v-select
              required
              @blur="$v.trainingType.$touch()"
              @change="$v.trainingType.$touch()"
              :error-messages="trainingTypeErrors"
              v-model="trainingType"
              color="deep-purple"
              label="Type of Training"
              :items="trainingTypes"
            />

            <v-select
              required
              @blur="$v.region.$touch()"
              @change="$v.region.$touch()"
              :error-messages="regionErrors"
              v-model="region"
              color="deep-purple"
              label="Region"
              :items="regions"
            />

            <v-select
              required
              @blur="$v.district.$touch()"
              @change="$v.district.$touch()"
              :error-messages="districtErrors"
              v-model="district"
              color="deep-purple"
              label="District"
              :items="districts[region]"
            />
          </v-form>

          <v-divider />

          <v-card-actions>
            <v-btn
              @click="$refs.form.reset()"
              color="primary"
              round
            >
              <v-icon>clear</v-icon>Clear
            </v-btn>
            <v-spacer />
            <v-btn
              @click="signup()"
              :disabled="$v.$invalid"
              class="white--text"
              color="primary"
              depressed
              round
            >
              <v-icon left>how_to_reg</v-icon>Create Account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-spacer />
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios';
import { required } from 'vuelidate/lib/validators';
import { uuid } from 'vue-uuid';
import VueCookies from 'vue-cookies';

const config = require('../../config');
const isProduction = process.env.NODE_ENV === 'production';
const backendServer = (isProduction ? config.build.backend : config.dev.backend);

export default {
  validations: {
    startDate: { required },
    endDate: { required },
    trainingType: { required },
    cadre: { required },
    region: { required },
    district: { required }
  },
  data () {
    return {
      cadre: '',
      sessionId: '',
      cadres: [
        {text: "Enrolled Nurse", value: "enrolled-nurse"},
        {text: "Registered Nurse", value: "registered-nurse"},
        {text: "Clinical Assistant", value: "clinical-assistant"},
        {text: "Clinical Officer", value: "clinical-officer"},
        {text: "Assistant Medical Officer", value: "assistant-medical-officer"},
        {text: "Medical Officer", value: "medical-officer"},
        {text: "Assistant Dental Officer", value: "assistant-dental-officer"},
        {text: "Dental Officer", value: "dental-officer"}
      ],
      trainingTypes: [
        {text: "New / Basic", value: "basic"},
        {text: "Refresher", value: "refresher"}
      ],
      regions: [
        {text: "Arusha", value: "arusha"},
        {text: "DAR", value: "dar"},
        {text: "Dodoma", value: "dodoma"},
        {text: "Geita", value: "geita"},
        {text: "Iringa", value: "iringa"},
        {text: "Kagera", value: "kagera"},
        {text: "Katavi", value: "katavi"},
        {text: "Kigoma", value: "kigoma"},
        {text: "Kilimanjaro", value: "kilimanjaro"},
        {text: "Kusini Unguja", value: "kusiniUnguja"},
        {text: "Lindi", value: "lindi"},
        {text: "Manyara", value: "manyara"},
        {text: "Mara", value: "mara"},
        {text: "Mbeya", value: "mbeya"},
        {text: "Mjini Magharibi", value: "mjiniMagharibi"},
        {text: "Morogoro", value: "morogoro"},
        {text: "Mtwara", value: "mtwara"},
        {text: "Mwanza", value: "mwanza"},
        {text: "Njombe", value: "njombe"},
        {text: "Pwani", value: "pwani"},
        {text: "Rukwa", value: "rukwa"},
        {text: "Ruvuma", value: "ruvuma"},
        {text: "Shinyanga", value: "shinyanga"},
        {text: "Simiyu", value: "simiyu"},
        {text: "Singida", value: "singida"},
        {text: "Songwe", value: "songwe"},
        {text: "Tabora", value: "tabora"},
        {text: "Tanga", value: "tanga"}
      ],
      districts: {
        arusha: [
          {text: "Meru District Council", value: "Meru District Council"},
          {text: "Arusha City Council", value: "Arusha City Council"},
          {text: "Arusha District Council", value: "Arusha District Council"},
          {text: "Karatu District Council", value: "Karatu District Council"},
          {text: "Longido District Council", value: "Longido District Council"},
          {text: "Monduli District Council", value: "Monduli District Council"},
          {text: "Ngorongoro District Council", value: "Ngorongoro District Council"}
        ],
        dar: [
          {text: "Ilala Municipal Council", value: "Ilala Municipal Council"},
          {text: "Kinondoni Municipal Council", value: "Kinondoni Municipal Council"},
          {text: "Temeke Municipal Council", value: "Temeke Municipal Council"},
          {text: "Kigamboni Municipal Council", value: "Kigamboni Municipal Council"},
          {text: "Ubungo Municipal Council", value: "Ubungo Municipal Council"}
        ],
        dodoma: [
          {text: "Bahi District Council", value: "Bahi District Council"},
          {text: "Chamwino District Council", value: "Chamwino District Council"},
          {text: "Chemba District Council", value: "Chemba District Council"},
          {text: "Dodoma Municipal Council", value: "Dodoma Municipal Council"},
          {text: "Kondoa District Council", value: "Kondoa District Council"},
          {text: "Kongwa District Council", value: "Kongwa District Council"},
          {text: "Mpwapwa District Council", value: "Kongwa District Council"}
        ],
        geita: [
          {text: "Bukombe District Council", value: "Bukombe District Council"},
          {text: "Chato District Council", value: "Chato District Council"},
          {text: "Geita Town Council", value: "Geita Town Council"},
          {text: "Geita District Council", value: "Geita District Council"},
          {text: "Mbogwe District Council", value: "Mbogwe District Council"},
          {text: "Nyang'hwale District Council", value: "Nyang'hwale District Council"}
        ],
        iringa: [
          {text: "Iringa District Council", value: "Iringa District Council"},
          {text: "Iringa Municipal Council", value: "Iringa Municipal Council"},
          {text: "Kilolo District Council", value: "Kilolo District Council"},
          {text: "Mafinga Town Council", value: "Mafinga Town Council"},
          {text: "Mufindi District Council", value: "Mufindi District Council"}
        ],
        kagera: [
          {text: "Biharamulo District Council", value: "Biharamulo District Council"},
          {text: "Bukoba District Council", value: "Bukoba District Council"},
          {text: "Bukoba Municipal Council", value: "Bukoba Municipal Council"},
          {text: "Karagwe District Council", value: "Karagwe District Council"},
          {text: "Kyerwa District Council", value: "Kyerwa District Council"},
          {text: "Missenyi District Council", value: "Missenyi District Council"},
          {text: "Muleba District Council", value: "Muleba District Council"},
          {text: "Ngara District Council", value: "Ngara District Council"}
        ],
        katavi: [
          {text: "Mlele District Council", value: "Mlele District Council"},
          {text: "Mpanda District Council", value: "Mpanda District Council"},
          {text: "Mpanda Town Council", value: "Mpanda Town Council"}
        ],
        kigoma: [
          {text: "Buhigwe District Council", value: "Buhigwe District Council"},
          {text: "Kakonko District Council", value: "Kakonko District Council"},
          {text: "Kasulu District Council", value: "Kasulu District Council"},
          {text: "Kasulu Town Council", value: "Kasulu Town Council"},
          {text: "Kibondo District Council", value: "Kibondo District Council"},
          {text: "Kigoma District Council", value: "Kigoma District Council"},
          {text: "Kigoma-Ujiji Municipal Council", value: "Kigoma-Ujiji Municipal Council"},
          {text: "Uvinza District Council", value: "Uvinza District Council"}
        ],
        kilimanjaro: [
          {text: "Hai District Council", value: "Hai District Council"},
          {text: "Moshi District Council", value: "Moshi District Council"},
          {text: "Moshi Municipal Council", value: "Moshi Municipal Council"},
          {text: "Mwanga District Council", value: "Mwanga District Council"},
          {text: "Rombo District Council", value: "Rombo District Council"},
          {text: "Same District Council", value: "Same District Council"},
          {text: "Siha District Council", value: "Siha District Council"}
        ],
        kusiniUnguja: [
          {text: "Chake Chake District", value: "Chake Chake District"},
          {text: "Mkoani District", value: "Mkoani District"}
        ],
        lindi: [
          {text: "Kilwa District Council", value: "Kilwa District Council"},
          {text: "Lindi District Council", value: "Lindi District Council"},
          {text: "Lindi Municipal Council", value: "Lindi Municipal Council"},
          {text: "Liwale District Council", value: "Liwale District Council"},
          {text: "Nachingwea District Council", value: "Nachingwea District Council"},
          {text: "Ruangwa District Council", value: "Ruangwa District Council"}
        ],
        manyara: [
          {text: "Babati Town Council", value: "Babati Town Council"},
          {text: "Babati District Council", value: "Babati District Council"},
          {text: "Hanang District Council", value: "Hanang District Council"},
          {text: "Kiteto District Council", value: "Kiteto District Council"},
          {text: "Mbulu District Council", value: "Mbulu District Council"},
          {text: "Simanjiro District Council", value: "Simanjiro District Council"}
        ],
        mara: [
          {text: "Bunda District Council", value: "Bunda District Council"},
          {text: "Butiama District Council", value: "Butiama District Council"},
          {text: "Musoma District Council", value: "Musoma District Council"},
          {text: "Musoma Municipal Council", value: "Musoma Municipal Council"},
          {text: "Rorya District Council", value: "Rorya District Council"},
          {text: "Serengeti District Council", value: "Serengeti District Council"},
          {text: "Tarime District Council", value: "Tarime District Council"}
        ],
        mbeya: [
          {text: "Busokelo District Council", value: "Busokelo District Council"},
          {text: "Chunya District Council", value: "Chunya District Council"},
          {text: "Kyela District Council", value: "Kyela District Council"},
          {text: "Mbarali District Council", value: "Mbarali District Council"},
          {text: "Mbeya City Council", value: "Mbeya City Council"},
          {text: "Mbeya District Council", value: "Mbeya District Council"},
          {text: "Rungwe District Council", value: "Rungwe District Council"}
        ],
        mjiniMagharibi: [
          {text: "Magharibi District", value: "Magharibi District"},
          {text: "Mjini District ", value: "Mjini District "}
        ],
        morogoro: [
          {text: "Gairo District Council", value: "Gairo District Council"},
          {text: "Kilombero District Council", value: "Kilombero District Council"},
          {text: "Kilosa District Council", value: "Kilosa District Council"},
          {text: "Morogoro District Council", value: "Morogoro District Council"},
          {text: "Morogoro Municipal Council", value: "Morogoro Municipal Council"},
          {text: "Mvomero District Council", value: "Mvomero District Council"},
          {text: "Ulanga District Council", value: "Ulanga District Council"},
          {text: "Malinyi District Council", value: "Malinyi District Council"},
          {text: "Ifakara Township Council", value: "Ifakara Township Council"}
        ],
        mtwara: [
          {text: "Masasi District Council", value: "Masasi District Council"},
          {text: "Masasi Town Council", value: "Masasi Town Council"},
          {text: "Mtwara District Council", value: "Mtwara District Council"},
          {text: "Mtwara Municipal Council", value: "Mtwara Municipal Council"},
          {text: "Nanyumbu District Council", value: "Nanyumbu District Council"},
          {text: "Newala District Council", value: "Newala District Council"},
          {text: "Tandahimba District Council", value: "Tandahimba District Council"}
        ],
        mwanza: [
          {text: "Ilemela Municipal Council", value: "Ilemela Municipal Council"},
          {text: "Kwimba District Council", value: "Kwimba District Council"},
          {text: "Magu District Council", value: "Magu District Council"},
          {text: "Misungwi District Council", value: "Misungwi District Council"},
          {text: "Nyamagana Municipal Council", value: "Nyamagana Municipal Council"},
          {text: "Sengerema District Council", value: "Sengerema District Council"},
          {text: "Ukerewe District Council", value: "Ukerewe District Council"}
        ],
        njombe: [
          {text: "Ludewa District Council", value: "Ludewa District Council"},
          {text: "Makambako Town Council", value: "Makambako Town Council"},
          {text: "Makete District Council", value: "Makete District Council"},
          {text: "Njombe District Council", value: "Njombe District Council"},
          {text: "Njombe Town Council", value: "Njombe Town Council"},
          {text: "Wanging'ombe District Council", value: "Wanging'ombe District Council"}
        ],
        pwani: [
          {text: "Bagamoyo District Council", value: "Bagamoyo District Council"},
          {text: "Kibaha District Council", value: "Kibaha District Council"},
          {text: "Kibaha Town Council", value: "Kibaha Town Council"},
          {text: "Kisarawe District Council", value: "Kisarawe District Council"},
          {text: "Mafia District Council", value: "Mafia District Council"},
          {text: "Mkuranga District Council", value: "Mkuranga District Council"},
          {text: "Rufiji District Council", value: "Rufiji District Council"}
        ],
        rukwa: [
          {text: "Kalambo District Council", value: "Kalambo District Council"},
          {text: "Nkasi District Council", value: "Nkasi District Council"},
          {text: "Sumbawanga District Council", value: "Sumbawanga District Council"},
          {text: "Sumbawanga Municipal Council", value: "Sumbawanga Municipal Council"}
        ],
        ruvuma: [
          {text: "Mbinga District Council", value: "Mbinga District Council"},
          {text: "Songea District Council", value: "Songea District Council"},
          {text: "Songea Municipal Council", value: "Songea Municipal Council"},
          {text: "Tunduru District Council", value: "Tunduru District Council"},
          {text: "Namtumbo District Council", value: "Namtumbo District Council"},
          {text: "Nyasa District Council", value: "Nyasa District Council"}
        ],
        shinyanga: [
          {text: "Kahama Town Council", value: "Kahama Town Council"},
          {text: "Kahama District Council", value: "Kahama District Council"},
          {text: "Kishapu District Council", value: "Kishapu District Council"},
          {text: "Shinyanga District Council", value: "Shinyanga District Council"},
          {text: "Shinyanga Municipal Council", value: "Shinyanga Municipal Council"}
        ],
        simiyu: [
          {text: "Bariadi District Council", value: "Bariadi District Council"},
          {text: "Busega District Council", value: "Busega District Council"},
          {text: "Itilima District Council", value: "Itilima District Council"},
          {text: "Maswa District Council", value: "Maswa District Council"},
          {text: "Meatu District Council", value: "Meatu District Council"}
        ],
        singida: [
          {text: "Ikungi District Council", value: "Ikungi District Council"},
          {text: "Iramba District Council", value: "Iramba District Council"},
          {text: "Manyoni District Council", value: "Manyoni District Council"},
          {text: "Mkalama District Council", value: "Mkalama District Council"},
          {text: "Singida District Council", value: "Singida District Council"},
          {text: "Singida Municipal Council", value: "Singida Municipal Council"}
        ],
        songwe: [
          {text: "Ileje District", value: "Ileje District"},
          {text: "Mbozi District", value: "Mbozi District"},
          {text: "Momba District", value: "Momba District"},
          {text: "Songwe District", value: "Songwe District"}
        ],
        tabora: [
          {text: "Igunga District Council", value: "Igunga District Council"},
          {text: "Kaliua District Council", value: "Kaliua District Council"},
          {text: "Nzega District Council", value: "Nzega District Council"},
          {text: "Sikonge District Council", value: "Sikonge District Council"},
          {text: "Tabora Municipal Council", value: "Tabora Municipal Council"},
          {text: "Urambo District Council", value: "Urambo District Council"},
          {text: "Uyui District Council", value: "Uyui District Council"}
        ],
        tanga: [
          {text: "Handeni District Council", value: "Handeni District Council"},
          {text: "Handeni Town Council", value: "Handeni Town Council"},
          {text: "Kilindi District Council", value: "Kilindi District Council"},
          {text: "Korogwe Town Council", value: "Korogwe Town Council"},
          {text: "Korogwe District Council", value: "Korogwe District Council"},
          {text: "Lushoto District Council", value: "Lushoto District Council"},
          {text: "Muheza District Council", value: "Muheza District Council"},
          {text: "Mkinga District Council", value: "Mkinga District Council"},
          {text: "Pangani District Council", value: "Pangani District Council"},
          {text: "Tanga City Council", value: "Tanga City Council"}
        ]
      },
      region: '',
      district: '',
      startDate: '',
      startDateFormatted: '',
      endDate: '',
      endDateFormatted: '',
      trainingType: '',
      alertFail: false,
      alertSuccess: false,
      alertMsg: '',
      previousPath: null
    }
  },
  methods: {
    formatDate (date) {
      if (!date) {
        return null
      }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    signup () {
      this.$store.state.dynamicProgress = true;
      this.$store.state.progressTitle = 'Creating Account';

      let formData = new FormData();

      formData.append('startDate', this.startDate);
      formData.append('endDate', this.endDate);
      formData.append('cadre', this.cadre);
      formData.append('trainingType', this.trainingType);
      formData.append('sessionId', this.sessionId);
      formData.append('district', this.district);
      formData.append('region', this.region);

      axios
        .post(backendServer + '/add-trainee/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(trainee => {
          this.startDate = "";
          this.endDate = "";
          this.cadre = "";
          this.trainingType = "";
          this.district = "";
          this.region = "";

          this.$store.state.dynamicProgress = false;
          this.$store.state.trainee = true;
          this.$store.state.traineeId = trainee.data._id;
          this.alertSuccess = true;
          this.alertMsg = 'Account created successfully';

          if (this.previousPath) {
            this.$router.push({
              path: this.previousPath
            });
          } else {
            this.$router.push({
              name: "Home"
            });
          }
        });
    },
    displayLogin () {
      this.$router.push({ name: 'Login' })
    }
  },
  computed: {
    startDateErrors() {
      const errors = [];
      if (!this.$v.startDate.$dirty) return errors;
      !this.$v.startDate.required && errors.push('Training start date is required');
      return errors;
    },
    endDateErrors() {
      const errors = [];
      if (!this.$v.endDate.$dirty) return errors;
      !this.$v.endDate.required && errors.push('Training end date is required');
      return errors;
    },
    cadreErrors() {
      const errors = [];
      if (!this.$v.cadre.$dirty) return errors;
      !this.$v.cadre.required && errors.push('Cadre is required');
      return errors;
    },
    trainingTypeErrors() {
      const errors = [];
      if (!this.$v.trainingType.$dirty) return errors;
      !this.$v.trainingType.required && errors.push('Training type is required');
      return errors;
    },
    districtErrors() {
      const errors = [];
      if (!this.$v.district.$dirty) return errors;
      !this.$v.district.required && errors.push('District is required');
      return errors;
    },
    regionErrors() {
      const errors = [];
      if (!this.$v.region.$dirty) return errors;
      !this.$v.region.required && errors.push('Region is required');
      return errors;
    }
  },
  created () {
    this.previousPath = this.$route.query.previousPath;
    this.$store.state.signupFields = VueCookies.get('signupFields');
    this.sessionId = uuid.v4();
  },
  watch: {
    startDate (val) {
      this.startDateFormatted = this.formatDate(this.startDate)
    },
    endDate (val) {
      this.endDateFormatted = this.formatDate(this.endDate)
    }
  }
}
</script>
