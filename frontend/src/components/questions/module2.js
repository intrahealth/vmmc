export const module2 = {
	'0': {
		'situationText': 'Your assistant is about to prepare the skin with iodine antiseptic solution, however you remember that the client is allergic to iodine.  Instead, you tell your assistant to use:',
		'choices': [{
			'choiceText': 'A. Isopropyl alcohol',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Dilute the iodine solution with isopropyl alcohol in 1:2 ratio',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Chlorhexidine gluconate',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'D. None of the antiseptics are suitable.',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 1,
		'prevMove': null
	},
	'1': {
		'situationText': 'The client’s skin has now been prepped and properly draped.  You are ready to administer the anesthesia.  Your assistant hands you the needle and vial.  You…',
		'choices': [{
			'choiceText': 'A. You take the appropriate amount of anesthetic into the needle and inject at the site of the twin dorsal nerves',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. You check the vial of anesthetic to ensure the correct agent at the correct concentration has been selected.',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Pause procedure.',
			'comment': 'Why? Incorrect aseptic technique',
			'correct': 'yes',
			'choices': [{
				'choiceText': 'Why? Incorrect aseptic technique',
				'correct': 'yes',
				'impact': 1,
				'bonus': 0
			}]
		}
		],
		'nextMove': 2,
		'prevMove': 0
	},
	'2': {
		'situationText': 'The penile nerve block with required anesthesia to be injected at two positions. Click on both appropriate areas in the diagram provided. Note: The player will see a diagram of the penis and will need to manipulate the picture of a hand holding the needle and click on the two correct areas before proceeding to next step. (See diagram A below)',
		'choices': [{
			'choiceText': 'A. Click on dorsal penile nerves at 1 o’clock and 11 o’clock positions',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'B. Click on other positions on penis',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Pause procedure',
			'comment': '',
			'correct': 'yes',
			'choices': [{
				'choiceText': 'Why? In this diagram the picture of the hand holding the needle is not gloved.  Extra bonus points for noticing this error! Player will be asked to select the correct positions with a gloved hand on the screen.',
				'correct': 'yes',
				'impact': 1,
				'bonus': 1
			},
			{
				'choiceText': 'Why? Diagram does not show the correct anatomy.',
				'correct': 'no',
				'impact': 0,
				'bonus': 0
			}]
		}
		],
		'nextMove': 3,
		'prevMove': 1
	},
	'3': {
		'situationText': 'To ensure maximum achievement of anesthetic effect during MC procedure, you also perform a ring block.  With your fine (23-gauge) needle, click on the locations on the diagram where you would inject.',
		'choices': [{
			'choiceText': 'A. Click on other positions on penis',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Click on the correct subcutaneous locations, forming a ring around the penis',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'C. Pause procedure',
			'comment': '',
			'correct': 'yes',
			'choices': [{
				'choiceText': 'Why?  If the player did not notice the hand holding the needle is not gloved in the previous question, they will have another chance to point out the error.',
				'correct': 'yes',
				'impact': 1,
				'bonus': 0
			},
			{
				'choiceText': 'Why? Incorrect instrument.',
				'correct': 'no',
				'impact': 0,
				'bonus': 0
			}
			]
		}
		],
		'nextMove': 4,
		'prevMove': 2
	},
	'4': {
		'situationText': 'The patient weighs 40 kg. How much lidocaine at 2% anesthetic did you use?',
		'choices': [{
			'choiceText': 'A. 0.9 ml',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. 6 ml',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'C. 21 ml',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'D. 47 ml',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 5,
		'prevMove': 3
	},
	'5': {
		'situationText': 'How many minutes after injection do you wait before beginning the procedure?',
		'choices': [{
			'choiceText': 'A. 3 minutes',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'B. 5 minutes',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. 10 minutes',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. 25 minutes',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 6,
		'prevMove': 4
	},
	'6': {
		'situationText': 'The patient has been adequately anesthetized, the circumcision line has been correctly marked, and you are ready to retract the foreskin.  You ask your assistant for which instrument?',
		'choices': [{
			'choiceText': 'A. Artery forceps',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'B. Backhaus towel clamp',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Sponge-holding forceps',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 7,
		'prevMove': 5
	},
	'7': {
		'situationText': 'Click on the foreskin the two locations where you would place the artery forceps to provide sufficient tension on the inside and outside surfaces of the foreskin.',
		'choices': [{
			'choiceText': 'A. On the 3 and 9 o’clock positions around the foreskin',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'B. Anywhere else on the foreskin',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Pause procedure',
			'comment': '',
			'correct': 'no',
			'choices': [
				{
					'choiceText': 'Why? Incorrect instruments.',
					'correct': 'no',
					'impact': 0,
					'bonus': 0
				},
				{
					'choiceText': 'Why? Incorrect anatomy shown.',
					'correct': 'no',
					'impact': 0,
					'bonus': 0
				}
			]
		}
		],
		'nextMove': 8,
		'prevMove': 6
	},
	'8': {
		'situationText': 'Now that the foreskin is tight, crush with the scalpel where the first incision should be.',
		'choices': [{
			'choiceText': 'A. Cut the dorsal slit in the 12 o’clock position',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Cut anywhere else on the penis',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Pause procedure',
			'comment': '',
			'correct': 'yes',
			'choices': [{
				'choiceText': 'Why? Incorrect instrument; use Long artery forceps to crush.',
				'correct': 'yes',
				'impact': 1,
				'bonus': 0
			},
			{
				'choiceText': 'Why? Incorrect anatomy shown.',
				'correct': 'no',
				'impact': 0,
				'bonus': 0
			}
			]
		}
		],
		'nextMove': 9,
		'prevMove': 7
	},
	'9': {
		'situationText': 'You drop a tool and it lands on the ground, now what?',
		'choices': [{
			'choiceText': 'A. Ask assistant to pick up the tool and fetch a new one.',
			'comment': 'Incorrect. The assistant is part of the surgical procedure team and should always maintain sterility throughout the procedure.',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Ask the runner to pick up the tool, place it in the bucket of soiled equipment to soak and ask your assistant for a clean tool.',
			'comment': 'Correct! Cleanliness is essential in avoiding infection.',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'C. Leave the tool on the ground.',
			'comment': 'Incorrect. This could cause a tripping and biomedical hazard.',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 10,
		'prevMove': 8
	},
	'10': {
		'situationText': 'The rest of the foreskin was cut free, leaving 5mm of skin proximal to the corona.  To clip any bleeding vessels, you ask your assistant for…',
		'choices': [{
			'choiceText': 'A. Sponge-holding forceps',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Artery forceps',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'C. Tissue forceps',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 11,
		'prevMove': 9
	},
	'11': {
		'situationText': 'You tie each bleeding vessel with chromic catgut 3-0 suture.  What kind of suture technique do you use for the frenulum (6 o’clock)?',
		'choices': [{
			'choiceText': 'A. Horizontal mattress suture',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'B. Simple interrupted suture',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Vertical mattress suture',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': 12,
		'prevMove': 10
	},
	'12': {
		'situationText': 'When placing the frenulum suture, you take care to align the line of the frenulum with…',
		'choices': [{
			'choiceText': 'A. Glans',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Penile raphe',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'C. Midline skin raphe (A common error is to misalign the frenulum and the midline skin raphe, which results in misalignment of the whole circumcision closure.)',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		}
		],
		'nextMove': 13,
		'prevMove': 11
	},
	'13': {
		'situationText': 'Once all the sutures are done and the procedure is finished, you check for bleeding.  What kind of dressing do you place first?',
		'choices': [{
			'choiceText': 'A. Sterile dry gauze',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		},
		{
			'choiceText': 'B. Petroleum jelly impregnated gauze',
			'comment': '',
			'correct': 'yes',
			'impact': 1,
			'bonus': 0
		},
		{
			'choiceText': 'C. Sticking plaster',
			'comment': '',
			'correct': 'no',
			'impact': 0,
			'bonus': 0
		}
		],
		'nextMove': null,
		'prevMove': 12
	}
}