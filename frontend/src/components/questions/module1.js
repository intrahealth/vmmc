module.exports = {
  "clientA": {
    "0": {
      "situationText": "A 20-year-old male (Amani) from a neighboring village comes to the VMMC campaign.  He’s been waiting all day for his turn for individual counseling.  You greet the client respectively and with kindness.  You introduce yourself and ask for the name of the client.  What is your next step?",
      "choices": [{
        "choiceText": "A. Ask the client if his caretaker/parent would like to participate",
        "comment": "The client might be slightly offended to ask immediately if he'd like to participate. It is recommended that as the next step that you ask the client what he already knows and learn what is the client's level of understanding. Provide counseling and any vital information before you ask if he'd like to participate.",
        "impact": "-1"
      }, {
        "choiceText": "B. Begin talking about circumcision procedure.",
        "comment": "It is recommended that as the next step that you ask the client what he already knows to have and learn what is the client's level of understanding before jumping to the procedure. Provide counseling and any vital information so there are no information gaps.",
        "impact": "-1"
      }, {
        "choiceText": "C. Ask the client to tell you what he already knows about male circumcision.",
        "comment": "That is excellent. It is recommended that as the next step that you ask the client what he already knows and learn about the client's level of understanding. Provide counseling and any vital information so there are no information gaps.",
        "impact": "+1"
      }],
      "nextMove": 1,
      "prevMove": null
    },
    "1": {
      "situationText": "Amani interrupts your explanation of the circumcision procedure to ask you some questions.  He tells you he’s worried that MC will cause infertility.  You:",
      "choices": [{
        "choiceText": "A. Laugh a little and tell the client not to ask such silly questions before explaining the facts about MC.",
        "comment": "As a health care provider, you want to understand the client’s thinking about popular myths so that they can be addressed. The client does not know what is true or not. Your role is to provide respectful care to help the client understand the facts about the procedure and how it relates to sexual and reproductive health.",
        "impact": "-1"
      }, {
        "choiceText": "B. Ask the client more about why they think this way.",
        "comment": "Excellent. As a health care provider, you want to understand the client’s thinking around popular myths so that they can be addressed. The client does not know what is true or not. Your role is to provide respectful care to help the client understand the facts about the procedure and how it relates to sexual and reproductive health.",
        "impact": "+1"
      }, {
        "choiceText": "C. Respond that MC does not cause infertility before moving on.",
        "comment": "It is good that you corrected the misinformation yet it was a missed opportunity to talk about sexual and reproductive health. As a health provider, you want to understand the client’s thinking around popular myths so that they can be addressed. Your role is to provide respectful care to help the client understand the facts about the procedure and also how it relates to sexual and reproductive health.",
        "impact": "0"
      }],
      "nextMove": 2,
      "prevMove": 0
    },
    "2": {
      "situationText": "Amani tells you he is HIV positive.  How do you respond?",
      "choices": [{
        "choiceText": "A. Tell him sorry but you cannot risk you and the other health workers’ safety by performing surgery on an HIV+ client.",
        "comment": "According to the National HTS guidelines if a clients test HIV positive, he/she should receive post test counselling for HIV+ persons and VMMC considerations becomes secondary. Clients are offered support for the new HIV diagnosis and linked to Care and Treatment clinics. Once enrolled and initial management has been done, the client will then attend VMMC clinic for male circumcision and correct information given that the circumcision will not provide the 60% protection against HIV infection in HIV positive persons",
        "impact": "-1"
      }, {
        "choiceText": "B. Try to find out more about his understanding of MC and why he is seeking services.",
        "comment": "Correct, The role of the health care provider in HIV/AIDS interventions is to reduce stigma and discrimination against HIV/AIDS services and increase knowledge and awareness among the community members, it's a good thing you tried to gather more information about his understanding of MC and HIV prevention and correct any myths/misconceptions which exist in the community.",
        "impact": "+1"
      }, {
        "choiceText": "C. Tell him he’s not eligible since he’s already HIV positive.",
        "comment": "As a health care provider, you should provide clear and correct informations that although he is already HIV positive MC will not offer protection against HIV but there are other benefits which the client will get if he undergoes Male circumcision. Other benefits include reducing the risk of becoming infected with other STIs like Chancroid and Syphilis, lowering the risk of penile cancers in men, and reducing the cervical cancers rate and HPV infection to their women.",
        "impact": "-1"
      }],
      "nextMove": 3,
      "prevMove": 1
    },
    "3": {
      "situationText": "You explain that MC does not protect partners from contracting HIV and then you ask if he is receiving treatment at the Care and Treatment Centre (CTC). What next?",
      "choices": [{
        "choiceText": "A. The client tells you he is receiving CTC services so you tell him you can perform the circumcision.",
        "comment": "This is a great opportunity to provide additional information and counseling to the HIV positive clients that MC will not provide protective effect to partners of HIV positive clients, but Circumcision will provide other benefits including protection against other STIs, risk of penile cancers as well as reducing the rates of cervical cancers in their women. During the ongoing counseling it is also a great opportunity to discuss on ART adherence as well as routine monitoring of his health status in the Care and Treatment clinics",
        "impact": "-1"
      }, {
        "choiceText": "B. The client tells you he is not receiving CTC services so you tell him you cannot perform the circumcision.",
        "comment": "During the ongoing counselling session, Inform the client the importance of attending the Care and Treatment clinic for further management of his HIV status and initiation of ARVs. The Male Circumcision becomes secondary, take this opportunity to refer and link the client to the nearby CTC clinic and ensure enrollment by escoritng the client. After the client has been enrolled provide an appointment for MC in a later date.",
        "impact": "-1"
      }, {
        "choiceText": "C. The client tells you he is receiving CTC and you ask him to bring documentation of his last CD4 count before the surgical procedure.",
        "comment": "The availability of the CTC card is not a mandatory before the surgical procedure, as long as the client has provided assurance that he is already enrolled at CTC and possesses a CTC card. It is advised to continue providing VMMC services and avoid to make the client wait for longer periods of time. After providing the VMMC services remind the client the importance of ART adherence and attending CTC and maintaining proper hygiene.",
        "impact": "0"
      }],
      "nextMove": 4,
      "prevMove": 2
    },
    "4": {
      "situationText": "Amani returns with his CTC card. What additional counseling do you need to provide before the procedure?",
      "choices": [{
        "choiceText": "Information on risks of surgery, discussion on partner risks and wound care.",
        "comment": "In a calm, informative tone the health care provider should assist the client to have all the necessary informations before surgery.The discussion should focus on educating the clients on potential surgical risks, importance of hygiene and proper post operative wound care and other HIV prevention strategies i.e A-Abstinence, B-Being faithful C- Consinstent Correct use of condoms.",
        "impact": "+1"
      }, {
        "choiceText": "Information on risks of surgery and wound care.",
        "comment": "The counseling information provided to all clients is the same regardless of the HIV status. As a health care provider, you should provide accurate informations concerning the minor complications which might arise following surgery such as pain and bleeding. Importance of wound care and hygiene. The information provided to the HIV positive client does not differ from the information given to HIV negative clients.",
        "impact": "-1"
      }, {
        "choiceText": "Information on wound care.",
        "comment": "There are no special instructions needed to be given to HIV positive clients on wound care, the same post op instructions are given to HIV negative clients.  Post operative instructions on wound care should, emphasize on maintaining proper hygiene, wearing clean underwears which need to be changed daily, taking a bath, making sure he understands some possible complications although rare but can occur such as bleeding, severe pain in the penis/genital area, inability to pass urine, increased swelling and discharge or pus from the surgical wound.  The clients should return to the facility/site or seek emergency care if a problem develops.",
        "impact": "-2"
      }],
      "nextMove": 5,
      "prevMove": 3
    },
    "5": {
      "situationText": "Amani is now on ARV; though he has been cleared for VMMC procedure, he is worried about delayed wound healing time due to his HIV status.",
      "choices": [{
        "choiceText": "You tell client that he will heal normally as other HIV negative clients; it will take up seven days for superficial wound healing and six weeks for complete wound healing.",
        "comment": "Correct, Reassure the HIV positive client that his HIV status will not interfere with the wound healing. As long as he maintains proper nutrition, proper wound care and hygiene and adherence on his ARV drugs. Superficial wound healing will take up to seven days and complete wound healing is six weeks.",
        "impact": "+1"
      }, {
        "choiceText": "You tell the client that there will be delays in wound healing due his HIV status.",
        "comment": "This is incorrect, .As a health care provider this is your opportunity to provide further supportive counseling to the client and reassure him that he should maintain good adherence to his ARV's and any other medications prescribed in the Care and Treatment clinic, maintain proper nutrition and wound care. There is no difference on healing because of his HIV status. Make sure you inform the client to avoid sexual intercourse and masturbation for six (6)  weeks after the procedure so as to allow the wound to heal.Provide the client with condoms which he should continue to use after every act of sexual intercounse for at least six months after the six weeks healing period, this is to protect the client against other STIs and unwanted pregnancies.",
        "impact": "-1"
      }, {
        "choiceText": "You assure the client that there will be no delayed healing since ALL HIV positive clients are given prophylactic antibiotics.",
        "comment": "Prophylactic Antibiotics are not recommended in VMMC services and given only when there is wound infection.",
        "impact": "-2"
      }],
      "nextMove": "clientB",
      "prevMove": 4
    }
  },
  "clientB": {
    "0": {
      "situationText": "Zabron, aged 27 years old, HIV negative, married with two children, tells you that he needs MC services and he has got work permission for ten days only; he is afraid of losing a job as he might require two weeks for complete healing. You:",
      "choices": [{
        "choiceText": "Tell him that it’s true that he need two weeks and hence he might lose his job.",
        "comment": "This is incorrect.  It takes up to seven days for superficial healing of the wound  and six weeks for complete wound healing.As a health care provider you should advise your client with correct information that after seven days he  can return  to job  but he needs to avoid strenous work or lifting heavy objects which might result to wound disruption.",
        "impact": "-1"
      }, {
        "choiceText": "You inform him that he only need 5-7 days for superficial healing process. So, ten days are enough, and he can have MC procedure.",
        "comment": "Correct, the health care provider should encourage the client to proceed with the MC since he has enough time to achieve superficial healing before resuming work.",
        "impact": "+1"
      }, {
        "choiceText": "Tell him to return to work and ask for two weeks permission.",
        "comment": "As a  health care provider you  should avoid discouraging eligible clients to undergo MC procedure, by providing correct informations that within the  two weeks the healing will be advanced and the client can resume his job and normal activities. Providing the client with the correct information will enable him to make an informed decisions.",
        "impact": "0"
      }],
      "nextMove": 1,
      "prevMove": "clientA"
    },
    "1": {
      "situationText": "Many clients use bicycles/ motorcycles as the means of transport and source of income. Zabron is worried of his family income as he is doing business of bicycle taxi (bodaboda). As the counselor you advise him that he will return shortly to his business. You will tell your clients after circumcision that:",
      "choices": [{
        "choiceText": "He should not ride a bicycle for the first three days after operation",
        "comment": "Correct, the clients should be advised to continue riding their bicycles afer the first follow up visit usually Day two (48 hrs) following surgery , because during this time he is expected to have returned to the facility/outreach site for assessment of the wound and routine check up.",
        "impact": "+1"
      }, {
        "choiceText": "He can ride his bicycle after 24 hours after circumcision.",
        "comment": "This is incorrect. By increasing  pressure on a fresh wound this might lead to untying of the suture and bleeding.",
        "impact": "0"
      }, {
        "choiceText": "He can ride his bicycle after ten days.",
        "comment": "Incorrect. The client can ride his bicycle after 3 days, as we expect he should have by then attended the 48 hrs post op . The wound assessed and bandage removed.",
        "impact": "-1"
      }],
      "nextMove": 2,
      "prevMove": 0
    },
    "2": {
      "situationText": "Zabron is also worried about the risks of the procedure. He has never had surgery before and is concerned about complications. You will tell your client: ",
      "choices": [{
        "choiceText": "There are no risks associated with circumcision.",
        "comment": "Incorrect. During the health education and individual counseling ,clients should be informed that although rare but adverse events do occur, the adverse events which might occur include pain ( which increases in severity) , bleeding , swelling of the penis and failure to pass urine. The health care provider should use this opportunity to explain to the client that if he experiences one of the adverse events he should return back to the facility/outreach site for further evaluations. The health provider should ensure the emmergency contact no is filled in the Client appointment card.",
        "impact": "-1"
      }, {
        "choiceText": "There are risks associated with circumcision, but the chances of these occurring are very rare.",
        "comment": "Incorrect, though its true the risks associated with circumcision (Adverse events) rarely occur, but precautions should be taken and the client should return back to the facility/outreach site for further evaluations and management.",
        "impact": "0"
      }, {
        "choiceText": "In addition to the many benefits of circumcision there are a few risks. These are unlikely but may include pain, infection or hematoma which is a blood clot under the skin.",
        "comment": "This is correct, it is important explain the risks which might occur following circumcision such as pain( especially if it increases with severity) infection, bleeding hematoma and failure to pass urine.",
        "impact": "+1"
      }],
      "nextMove": 3,
      "prevMove": 1
    },
    "3": {
      "situationText": "Zabron asks if circumcision will also reduce his wife’s chances of getting HIV. You will tell your client:",
      "choices": [{
        "choiceText": "Women cannot be protected against HIV.",
        "comment": "The client should be educated on possible HIV preventive measures for women, that is ABC approach, avoiding sharps and needle sharing and he should be counseled on gender equality and promoting women on making informed choices on their health including condom negotiation. Also the client should be educated on benefits of circumcision in reducing  HPV transmission which leads to cervical cancer.",
        "impact": "-1"
      }, {
        "choiceText": "The best way to reduce your wife’s chances of getting HIV is for both partners to follow the ABCs- Abstinence, being faithful, condoms. Circumcision reduces your chances of contracting HIV but if you do get it, you can still pass it along to your partner.",
        "comment": "Excellent, the client should be educated on possible HIV preventive measures for women, that is ABC approach, avoiding sharps and needle sharing and he should be counseled on gender equality and promoting women on making informed choices on their health including condom negotiation. Also the client should be educated on benefits of circumcision in reducing  HPV transmission which leads to cervical cancer.",
        "impact": "+1"
      }, {
        "choiceText": "Male circumcision does not protect women from HIV.",
        "comment": "The client should be educated on possible HIV preventive measures for women, that is ABC approach, avoiding sharps and needle sharing and he should be counseled on gender equality and promoting women on making informed choices on their health including condom negotiation. Also the client should be educated on benefits of circumcision in reducing  HPV transmission which leads to cervical cancer.",
        "impact": "0"
      }],
      "nextMove": 4,
      "prevMove": 2
    },
    "4": {
      "situationText": "Zabron says he has 2 sons (a 4-year-old and a 12-year-old) and he wants to know if he should bring them in for VMMC. You will tell your client: ",
      "choices": [{
        "choiceText": "The 12-year-old child should be brought in for circumcision.",
        "comment": "This is correct, the client should be told that the 12-year-old child can be brought to the clinic for circumcision because he is within the eligible age category for Voluntary Medical Male Circumcision. The recommended age for circumcision in the VMMC program is for boys 10 years and older. This is the recommended age because they have attained their puberty and are at risk of contracting HIV infection through heterosexual intercourse.",
        "impact": "+1"
      }, {
        "choiceText": "A 4-year-old child can be brought in for VMMC services.",
        "comment": "This is incorrect, the client should be told that the 12-year-old child can be brought to the clinic for circumcision because he is within the eligible age category for Voluntary Medical Male Circumcision. The recommended age for circumcision in the VMMC program is for boys 10 years and older. This is the recommended age because they have attained their puberty and are at risk of contracting HIV infection through heterosexual intercourse. Tell the client that the 4 year boy can still undergo circumcision through other routine service delivery procedure at a given health facility but not under VMMC program.",
        "impact": "0"
      }, {
        "choiceText": "All children are sexually active; therefore, they need to be offered VMMC",
        "comment": "This is incorrect, the client should be told that the 12-year-old child can be brought to the clinic for circumcision because he is within the eligible age category for Voluntary Medical Male Circumcision. The recommended age for circumcision in the VMMC program is for boys 10 years and older. This is the recommended age because they have attained their puberty and are at risk of contracting HIV infection through heterosexual intercourse. Tell the client that the 4 year boy can still undergo circumcision through other routine service delivery procedure at a given health facility but not under VMMC program.",
        "impact": "-1"
      }],
      "nextMove": 5,
      "prevMove": 3
    },
    "5": {
      "situationText": "Zabron says he wants to have more children as soon as possible and would therefore like to resume sexual intercourse with his wife as soon as he returns from the circumcision procedure. You will tell your client:",
      "choices": [{
        "choiceText": "It takes 6 weeks for the circumcision wound to become strong enough to withstand gentle intercourse and recommends that he waits this period to avoid infection or other complications.",
        "comment": "Excellent, the provider must emphasize to the client that he must abstain from sexual activity throughout the healing period. It is very important that clients understand the commitment to abstinence. Healing takes about 6 weeks for adults and adolescents. No sexual activity may occur for 6 weeks after surgery. Sexual activity within 6 weeks of surgery can damage the wound, extend the healing period, and may lead to serious complications such as bleeding and hematoma and increases the risk of HIV transmission and acquisition. Remind the client that once he resume to sexual intercourse, he must use condom appropriately and consistently for the first 6 month following MC.",
        "impact": "+1"
      }, {
        "choiceText": "It is best to wait 3-4 months to resume intercourse.",
        "comment": "This is incorrect, the provider must emphasize to the client that he must abstain from sexual activity throughout the healing period. It is very important that clients understand the commitment to abstinence. Healing takes about 6 weeks for adults and adolescents. No sexual activity may occur for 6 weeks after surgery. Sexual activity within 6 weeks of surgery can damage the wound, extend the healing period, and may lead to serious complications such as bleeding and haematoma and increases the risk of HIV transmission and acquisition. Remind the client that once he resume to sexual intercourse, he must use condom appropriately and consistently for the first 6 month following MC.",
        "impact": "-1"
      }, {
        "choiceText": "It takes 4-6 weeks for the circumcision wound to be strong enough for intercourse so it’s best to masturbate in the meantime.",
        "comment": "This is incorrect, masturbation is not allowed for the first 6 weeks after MC. The provider must emphasize to the client that he must abstain from sexual activity throughout the healing period. It is very important that clients understand the commitment to abstinence. Healing takes about 6 weeks for adults and adolescents. No sexual activity may occur for 6 weeks after surgery. Sexual activity within 6 weeks of surgery can damage the wound, extend the healing period, and may lead to serious complications such as bleeding and haematoma and increases the risk of HIV transmission and acquisition. Remind the client that once he resume to sexual intercourse, he must use condom appropriately and consistently for the first 6 month following MC.",
        "impact": "0"
      }],
      "nextMove": 6,
      "prevMove": 4
    },
  },
  "clientC": {
    "0": {
      "situationText": "A day school teacher from the local primary school comes with 15 students who are at standard six and seven, aged between 14-16 years old for VMMC services. He says he will sign a consent form for them. As the counselor what will you do?",
      "choices": [{
        "choiceText": "You agree for him to sign consent and you thank him for coming with so many clients and you request him to come with more clients as they are important for the program to reach targets.",
        "comment": "This is not right; a parent or guardian should sign consent and get instructions on how to take care of the children.",
        "impact": "-1"
      }, {
        "choiceText": "You inform the teacher that there is no problem and each student will sign his own consent form.",
        "comment": "This information is not correct; consent is required from the guardians of clients under 18.",
        "impact": "-1"
      }, {
        "choiceText": "You thank the teacher for bringing the children for VMMC services and inform him that its only parents or guardians who are staying with children can sign for consent. Also, it’s important for children not to be subjected to procedure without their assent – since some may have come due to fear of the teacher.",
        "comment": "This is the correct response.",
        "impact": "+1"
      }],
      "nextMove": 1,
      "prevMove": "clientB"
    },
    "1": {
      "situationText": "After the teacher learns that the school children are not able to receive circumcision services without the consent of their parents or guardians, he becomes upset that he has wasted time and money transporting the children.  As a counselor, what will you do? ",
      "choices": [{
        "choiceText": "Ignore his frustration and refuse to waste more time—there are many other clients in line for services!",
        "comment": "Explain the importance of bringing in the parents/guardian for consent, proper health education, wound care and post-op follow-up.",
        "impact": "-1"
      }, {
        "choiceText": "Calmly discuss the matter with the teacher and allow the other staff members to manage the long lines of clients.",
        "comment": "While it is good to respond with patience, it is also not advisable to neglect the other clients waiting in line. Acknowledge his frustration and work quickly with the client to come up with a solution.",
        "impact": "0"
      }, {
        "choiceText": "Acknowledge the teacher frustration. Calmly discuss the matter and come up with a quick solution to the problem. Explain the importance of bringing in the parents/guardian for consent, proper health education, wound care and post-op follow-up",
        "comment": "This option is both efficient and provides an opportunity for the group to return for services.",
        "impact": "+1"
      }],
      "nextMove": 2,
      "prevMove": 0
    },
    "2": {
      "situationText": "One of the students (above 17 years) during group education asks if he can get MC services without being tested for HIV. As a counselor, what will you do?",
      "choices": [{
        "choiceText": "Tell him that MC services will not be given. HIV testing is a must.",
        "comment": "HTS in MC services follows an opt-out approach.",
        "impact": "-1"
      }, {
        "choiceText": "You tell him not to waste your time from those who are ready to test.",
        "comment": "Missed opportunity to explain (individually and to the large group of school children) the importance of HIV testing and linking prevention benefits MC offers against HIV.",
        "impact": "0"
      }, {
        "choiceText": "You tell the young man that he should make an informed decision whether to undergo HIV testing or not. In this large group of school children, however, you also insist on the importance of HIV testing to clients and use counseling skills to help the client make an informed decision.",
        "comment": "The purpose of this VMMC program is to provide MC for HIV prevention, thus, HTS is an important component for all clients.",
        "impact": "+1"
      }],
      "nextMove": 3,
      "prevMove": 1
    },
    "3": {
      "situationText": "The school teacher is worried that MC services will compromise students’ attendance after having the MC procedure, as they will require one week for resting at home. As a provider how will you respond?",
      "choices": [{
        "choiceText": "They should wait until the leave period when they will be free to access the service.",
        "comment": "The provider should assure the teacher that after MC procedure, clients are advised to rest for two or three days and not to do heavy work.",
        "impact": "-1"
      }, {
        "choiceText": "School should be closed so that students can attend MC services and they will resume with classes after they have been circumcised.",
        "comment": "No need to close schools as both programs can operate at the same time without compromising each other.",
        "impact": "-1"
      }, {
        "choiceText": "After MC procedure, students are advised to rest for two or three days and they can resume classes.",
        "comment": "You should assure the teacher that after MC procedure clients are advised to rest for few days and not to do heavy work; teacher can help excusing those students from heavy duties if any.",
        "impact": "+1"
      }],
      "nextMove": null,
      "prevMove": 2
    }
  }
}
