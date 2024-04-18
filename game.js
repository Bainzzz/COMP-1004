const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }


    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}


function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}


function selectOption(option) {
 const nextTextNodeID = option.nextText
 if (nextTextNodeID <= 0) {
    return startGame()
 }
 state = Object.assign(state, option.setState)
 showTextNode(nextTextNodeID)
}




const textNodes = [
    {
        id: 1,
        text: 'Youve been travelling for a few days investigating strange occurences until you encounter a strange hooded figure that points at you and says "Greetings traveller! A gift for you" the hooded man hands you an ominous sword',
        options: [
            {
                text: 'Deny the sword and ask who he is',
                setState: {unarmed: true, ndarkSword: true},
                nextText: 2
            },
            {
                text: 'Take the sword and ask who he is',
                setState: {darkSword: true},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: '"It matters not who I am but what is of importance is the tyranny of Zarathul"',
        options: [
            {
                text: '"Who is Zarathul?"',
                nextText: 3
            },
            {
                text: 'Attack the stranger',
                requiredState: (currentState) => currentState.darkSword,
                nextText: 4
            }
        ]
    },
    {
        id: 3,
        text: '"Zarathul is a troublesome sorcerer, many Heroes of Eldoria like yourself have tried to stop him but all have fallen to his might"',
        options: [
            {
                text: '"Where can i find this Zarathul?"',
                nextText: 6
            },
            {
                text: '"How do you know so much about this Zarathul?',
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: 'As you swing at the stranger your the mysterious sword glows and emits a sharp screeching sound, your body suddenly slows down and the stranger casts a purple lightning from his fingertips at you putting an end to your story',
        options: [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: '"Zarathul attacked my village... he slaughtered my people at the beginning of his reign with his dark magic, but I escaped and ever since I have been trying to warn other heroes of his power and prepare them for the greatest battle of their lives! Now theres no time!"',
        options: [
            {
                text: '"Where can I find him?"',
                nextText: 6
            }
        ]
    },
    {
        id: 6,
        text: 'You must head to The Obsidian Spire as he is casting a dark spell that may destroy Eldoria ! you will face many foes on your journey but I know you can do it, hero!',
        options: [
            {
                text: 'begin your journey',
                nextText: 7
            },
            {
                text: 'Take the ominous sword and begin your journey',
                requiredState: (currentState) => currentState.unarmed,
                setState: {darkSword: true, ndarkSword: false},
                nextText: 7
            }
        ]
    },
    {
        id: 7,
        text: 'You bid farewell to the stranger and begin your journey, you start with following the path forward and you soon walk into a small village however something is strange about this place, it looks like no one is living here, you hear a rattling noise',
        options: [
            {
                text:'Investigate the rattling noise',
                nextText:8
            },
            {
                text:'Ignore the sound and explore the abandoned building infront of you',
                nextText:20
            }
        ]
    },
    {
        id: 8,
        text: 'As you turn the corner to investigate the noise suddenly you are attacked by three skeletons. The first skeleton lifts his sword going for a strike.',
        options: [
            {
                text:'Parry the attack',
                nextText: 9
            },
        ]
    },
    {
        id: 9,
        text: 'After parrying the attack this leaves the skeleton vulnerable allwoing you to take it out with one swift and clean strike with your sword. Leaving only two skeletons left.',
        options: [
            {
                text: 'Try and defeat the last two skeletons at the same time',
                nextText: 10
            },
            {
                text: 'Single each skeleton out',
                nextText: 13
            }
        ]
    },
    {
        id: 10,
        text: 'Despite their fragile nature, the strength of two skeletons become overbearing as you have to continuosly block their attacks without finding much room for an opening.',
        options: [
            {
                text: 'block using the ominous sword',
                requiredState: (currentState) => currentState.darkSword,
                nextText: 11
            },
            {
                text: 'All you can do is block and hope',
                nextText: 12
            }
        ]
    },
    {
        id: 11, 
        text: 'When you think all hope is lost a wave of energy blasts from the sword destroying the remaining skeletons in the area. Despite the odds you defeated the skeleton group, you notice a glow coming from the remains of one of the skeletons',
        options: [
            {
                text: 'approach the glow',
                nextText: 22
            }
        ]
    },
    {
        id: 12,
        text: 'Despite your best efforts the skeletons attacks keep coming and eventually they break through your defences putting an end to your story ,maybe try singling them out',
        options: [
            {
                text: 'Retry',
                nextText: 8
            }
        ]
    },
    {
        id: 13,
        text: 'You quickly knock one of the skeletons over allowing you to focus on the one still standing',
        options: [
            {
                text: 'Use the ominous sword',
                requiredState: (currentState) => currentState.darkSword,
                nextText: 14
            },
            {
                text: 'Try and defeat the Skeleton quickly',
                nextText: 15
            }
        ] 
    },
    {
        id: 14,
        text: 'a wave of energy blasts from the sword destroying the remaining skeletons in the area. You defeated the skeleton group, you notice a glow coming from the remains of one of the skeletons',
        options: [
            {
                text: 'Approach the glow',
                nextText: 22
            }
        ]
    },
    {
        id: 15, 
        text: 'As you battle the skeleton, the one you knocked over seems to be charging up some attack with the weapon he was using. This attack seems dangerous',
        options: [
            {
                text: 'Jump out of the way',
                nextText: 16
            },
            {
                text: 'Keep fighting the skeleton',
                nextText: 17
            },
            {
                text: 'Use the shield',
                requiredState: (currentState) => currentState.Shield,
                nextText: 18
            }
        ]
    },
    {
        id: 17,
        text: 'A huge blast of energy comes from the knocked over skeleton, the blast completely destroys the skeleton you were fighting but it also hits you making you succumb to the same fate as your oppenent putting an end to your story.',
        options: [
            {
                text: 'Retry',
                nextText: 8
            }
        ]
    },
    {
        id: 16, 
        text: 'As you jump out of the way you just narrowly dodge the huge blast of energy however the skeleton you was fighting wasnt so lucky leaving just you and one more skeleton',
        options: [
            {
                text: 'Approach the skeleton on the floor',
                nextText:19
            }
        ]
    },
    {
        id: 19,
        text: 'You swiftly defeat the skeleton on the floor and you notice the a bright glow on the floor',
        options: [
            {
                text: 'investigate the glow',
                nextText: 22
            }
        ]
    },
    {
        id: 18,
        text: 'As you use your shield the energy blast is reflected back at its source but not before destroying the skeleton you were fighting, you have defeated the skeleton group, you notice a glow',
        options: [
            {
                text: 'Approach the glow',
                nextText: 22
            }
        ]
    },
    {
        id: 20,
        text: 'As you explore the building you find a shield! A bit rusty but it will be better than nothing',
        options: [
            {
                text: 'Take the shield',
                setState: {Shield: true},
                nextText: 21
            }
        ]
    },
    {
        id: 21,
        text: 'As you leave the building you are attacked by a group of 3 skeletons! The first skeleton lifts his sword going for a strike.',
        options: [
            {
                text: 'Parry the attack',
                nextText: 9
            }
        ]
    },
    {
        id: 22,
        text: 'You find a scepter but it appears that the magic stone within the scepter has crumbled. Despite this you take the scepter anyway there is also a gold coin that the skeletons were hoarding.',
        options: [
            {
                text: 'Continue on with your journey',
                setState: {coin: true, scepter: true},
                nextText: 23
            }
        ]
    },
    {
        id: 23,
        text: 'As you follow the path to The Obsidian Spire you pass a market in the middle of nowhere.',
        options: [
            {
                text: 'Enter the market',
                nextText: 24
            }
        ]
    },
    {
        id: 24,
        text: 'The inside of the market is extraordinary. The tiny market appears massive when you enter with all sorts of trinkets and magical items. The market keeper greets you "Hello there, what can I do for you?"',
        options: [
            {
                text: 'Inspect the trinkets',
                nextText: 25
            }
        ]
    },
    {
        id: 25,
        text: 'The keeper brings out a few items to show you',
        options: [
            {
                text: 'Inspect the red stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 26
            },
            {
                text: 'Inspect the purple stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 27
            },
            {
                text: 'Inspect the green stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 28
            },
            {
                text: 'Inspect the blue stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 29
            }
        ]
    },
    {
        id: 26,
        text: 'The red stone is imbued with fire magic and its power can be harnessed using a magical scepter. It also grants the owner protection from fire attacks',
        options: [
            {
                text: 'Purchase the red stone',
                setState: {coin: false, redStone: true},
                nextText: 30
            },
            {
                text: 'Inspect the purple stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 27
            },
            {
                text: 'Inspect the green stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 28
            },
            {
                text: 'Inspect the blue stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 29
            }
        ]
    },
    {
        id: 27,
        text: 'The purple stone is imbued with dark magic, similar to the one within the ominous sword, and its power can be harnessed using a magical scepter. It also grants the owner protection from dark magic attacks',
        options: [
            {
                text: 'Purchase the purple stone',
                setState: {coin: false, purpleStone: true},
                nextText: 31
            },
            {
                text: 'Inspect the red stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 26
            },
            {
                text: 'Inspect the green stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 28
            },
            {
                text: 'Inspect the blue stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 29
            }
        ]
    },
    {
        id: 28,
        text: 'The green stone is imbued with venomous magic and its power can be harnessed using a magical scepter. It also grants the owner protection from venom',
        options: [
            {
                text: 'Purchase the green stone',
                setState: {coin: false, greenStone: true},
                nextText: 32
            },
            {
                text: 'Inspect the purple stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 27
            },
            {
                text: 'Inspect the red stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 26
            },
            {
                text: 'Inspect the blue stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 29
            }
        ]
    },
    {
        id: 29,
        text: 'The blue stone is imbued with water magic and its power can be harnessed using a magical scepter. It also grants the owner protection from water based attacks',
        options: [
            {
                text: 'Purchase the blue stone',
                setState: {coin: false, blueStone: true},
                nextText: 33
            },
            {
                text: 'Inspect the purple stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 27
            },
            {
                text: 'Inspect the green stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 28
            },
            {
                text: 'Inspect the red stone',
                requiredState: (currentState) => currentState.coin,
                nextText: 26
            }
        ]
    },
    {
        id: 30, 
        text: 'After purchasing the red stone you place it into your scepter and you feel power rush through you and a small flame shoots from the scepter. you now can harness the power of flame whilst having gaining immunity to fire',
        options: [
            {
                text: 'Leave the market',
                nextText: 34
            }
        ]
    },
    {
        id: 31,
        text: 'After purchasing the purple stone you place it into your scepter and you feel power rush through you and a small burst of energy shoots from the scepter. you now can harness the power of dark magic whilst having gaining immunity to dark magic',
        options: [
            {
                text: 'Leave the market',
                nextText: 34
            }
        ]
    },
    {
        id: 32,
        text: 'After purchasing the green stone you place it into your scepter and you feel power rush through you and a green gas comes from the scepter. you now can harness the power of venom whilst having gaining immunity to venom',
        options: [
            {
                text: 'Leave the market',
                nextText: 34
            }
        ]
    },
    {
        id: 33,
        text: 'After purchasing the blue stone you place it into your scepter and you feel power rush through you and a small wave of water spirals the scepter. you now can harness the power of water whilst having gaining immunity to water based attacks',
        options: [
            {
                text: 'Leave the market',
                nextText: 34
            }
        ]
    },
    {
        id: 34,
        text: 'After leaving the market you weirdly feel a rush of motivation. You know there will be many more threats ahead of you but you are feeling determined. You continue on your journey for a few hours, the journey is quite peaceful and tranquil until you notice two diverging paths with two worn out tattered signs',
        options: [
            {
                text: 'Read the sign on the left',
                nextText: 35
            },
            {
                text: 'Read the sign on the right',
                nextText: 36
            },
            {
                text: 'Go left',
                nextText: 37
            },
            {
                text: 'Go right',
                nextText: 59
            }
        ]
    },
    {
        id: 35,
        text: "Beware the deep woods' silent terror, Where venom hides in shadows' embrace. To conquer the lurking arachnid's might, Seek solace in fire's fierce light.",
        options: [
            {
                text: 'Read the sign on the right',
                nextText: 36
            },
            {
                text: 'Go left',
                nextText: 37
            },
        ]
    },
    {
        id: 36,
        text: "Beware the orc, a wielder of Poseidons's curse, Its sinister gaze harbors powers adverse. Against conventional might, it may prevail, Seek its hidden vulnerability, or be doomed to fail.",
        options: [
            {
                text: 'Read the sign on the left',
                nextText: 35
            },
            {
                text: 'Go right',
                nextText: 59
            }
        ]
    },
    {
        id: 37,
        text: 'As you follow the left path you are on guard due to the unfamiliar surroundings and an eerie silence that fills the dark woods, the place is full of cobwebs and it smells putrid. Soon you hear a sound that sounds like rustling or multiple footsteps',
        options: [
            {
                text: 'Investigate the sound',
                setState: {poison: false},
                nextText: 38
            }
        ]
    }, 
    {
        id: 38,
        text: 'As you walk slightly off the path a collosal spider pounces at you.',
        options: [
            {
                text: 'Block using your shield',
                requiredState: (currentState) => currentState.Shield,
                nextText: 58
            },
            {
                text: 'Try and move out the way',
                setState: {npoison: true},
                nextText: 39
            }
        ]
    },
    {
        id: 39,
        text: 'You try to move out the way but the spider manages to latch on to you and bite you. you feel the venom coarsing through your body',
        options: [
            {
                text: 'Push the spider off of you',
                setState: {poison: true, npoison: false},
                nextText: 40
            },
            {
                text: 'Your scepter begins to glow',
                requiredState: (currentState) => currentState.greenStone,
                nextText: 49
            }
        ]
    },
    {
        id: 40,
        text: 'You muster up all the strength you can to throw the spider off of you. The spider lands on its feet and prepares another attack',
        options: [
            {
                text: 'Run away',
                nextText: 41 
            },
            {
                text: 'Prepare yourself for its attack',
                nextText: 42
            }
        ]
    },
    {
        id: 41,
        text: 'As you turn away from the spider it pounces but just narrowly misses you. You run away creating great distance between yourself and the monstrous creature however suddenly you feel a tight pull at your leg. Youve stepped in a web and it is incredibly strong. You realise your arms is stuck too so you are unable to grab your sword. You notice the spider making its way toward you but there is nothing you can do and you are stuck in the web. the spider makes its way to you and begins wrapping you in a silk cocoon putting an end to your journey.', 
        options: [
            {
                text: 'Retry',
                nextText: 37
            }
        ]
    },
    {
        id: 42,
        text: 'As it jumps at you, you are able to dodge it this time and while it tries to get up you are able to slash it with your sword, this seems to enrage the beast ',
        options: [
            {
                text: 'Attack using your sword',
                requiredState: (currentState) => currentState.poison,
                nextText: 43
            },
            {
                text: 'attack using your sword',
                requiredState: (currentState) => currentState.npoison,
                nextText: 50
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.redStone,
                nextText: 57
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.greenStone,
                nextText: 56
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.purpleStone,
                nextText: 55
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.blueStone,
                nextText: 54
            },
            {
                text: 'Run away',
                nextText: 41
            }
        ]
    },
    {
        id: 43,
        text: 'As you prepare to swing your sword you feel a rush of pain coarse through you. Its the venom from the bite and its making it hard to be offensive',
        options: [
            {
                text: 'Keep trying to attack the spider',
                nextText: 44
            },
            {
                text: 'Try and come up with a plan',
                nextText: 45
            },
            {
                text: 'Run away',
                nextText: 41
            }
        ]
    }, 
    {
        id: 44,
        text: 'As you try to attack the spider, your movements become clumsy and unfocused this leaves you vulnerable and the spider knocks you over with ease biting you again with its large, sharp fangs and even more venom coarses through you paralyzing your body leaving you at the mercy of the gargantuan arachnid as it swiftly puts an end to your journey.',
        options: [
            {
                text: 'retry',
                nextText: 37
            }
        ]
    },
    {
        id: 45, 
        text: 'As you look around you notice a lit torch, a skull and a dagger.',
        options: [
            {
                text: 'Take the torch',
                nextText: 46
            },
            {
                text: 'Take the skull',
                nextText: 47
            },
            {
                text: 'Take the dagger',
                nextText: 48
            }
        ]
    },
    {
        id: 47,
        text: 'After picking up the skull you realise it wasnt the best idea. After throwing it at the spider, the beast seems unphased and quickly leaps onto you and begins to devour you as youre unable to stop it putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 37
            }
        ]
    },
    {
        id: 48,
        text: 'Picking up the dagger initially seemed like the best idea at first however it seemed to be a more ineffective weapon than the other ones in your kit, this left you in a worse position than before and the spider takes advantage of this leaping onto you and devouring you putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 37
            }
        ]
    },
    {
        id: 46,
        text: 'The torch ,depsite not seeming to be the best option, proves to be very beneficial. As you wave the torch around the spider becomes frightened by the flame, you keep assualting the beast with the small blaze until the beast gives up its assault and scurries off into the forest. You may not have been able to defeat the beast but you were able to escape with your life',
        options: [
            {
                text: 'continue on with your journey',
                nextText:85
            }
        ]
    },
    {
        id: 49,
        text: 'As your scepter glows you feel the venom in your body begin to be neutralised and its like the beast never bit you to begin with',
        options: [
            {
                text: 'Push the spider off you',
                nextText: 40
            }
        ]
    },
    {
        id: 50,
        text: 'You strike the beast with your sword while it is vulnerable hacking away at its tough exterior, the spider screeches and tries to bite you in an attempt to get away from you',
        options: [
            {
                text: 'Keep assaulting the beast',
                nextText: 51
            },
            {
                text: 'Evade its clumsy attack',
                nextText: 53
            }
        ] 
    },
    {
        id: 51,
        text: 'The arachnid misses completely due to the pain it feels from your attacks and soon you are able to slay the beast with a few well aimed swings. You have defeated the Collosal spider.',
        options: [
            {
                text: 'Take the spider eye',
                setState: {eye: true},
                nextText: 52
            }
        ]
    },
    {
        id: 52,
        text: 'Spider eyes are a rare resource within Eldoria so you are sure this may come in handy later in your travels',
        options: [
            {
                text: 'Continue on with your journey',
                nextText: 85
            }
        ]
    },
    {
        id: 53,
        text: 'After evading the attack from the spider it scurries off quickly leaving you no chance to chase it. Youre a bit frustrated as you were so close to slaying the creature and you may have been able to obtain a valuable resource after defeating it but there is no time for what ifs you must keep on with your journey to save Eldoria.',
        options: [
            {
                text: 'Continue on with your journey',
                nextText: 85
            }
        ]
    },
    {
        id: 54,
        text: 'A powerful wave of water shoots from your scepter hitting the spider directly, the beast seems taken aback by the attack however it quickly brushes it off and rushes at you, it catches you with its incredible speed and begins to wrap you in a silky cocoon putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 37
            }
        ]
    },
    {
        id: 55,
        text: 'A powerful beam of dark magic shoots from your scepter however it moves too slowly and the spider is able to dodge your extremely powerful attack, the beast quickly rushes at you and jumps onto you, it catches you with its incredible speed and begins to wrap you in a silky cocoon putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 37
            }
        ]
    },
    {
        id: 56,
        text: 'You blast a cloud of venomous gas towards the beast however it proves ineffective the giant enemy spider seems to be immune to venomous attacks, this leaves you vulnerable and the spider latches onto you with its incredible speed and begins to wrap you in a sikly cocoon putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 37
            }
        ]
    },
    {
        id: 57,
        text: 'You blast a wide flame from your scepter engulfing the giant arachnid in a fiery blaze, the creature screeches and tries to put itself out in panic but its no use and the vile creature succumbs to the fire. You have defeated the Collosal spider',
        options: [
            {
                text: 'Take the spider eye',
                setState: {eye: true},
                nextText: 52
            }
        ]
    },
    {
        id: 58,
        text: 'The spider land on your shield protecting you from its attack, if you werent able to block it then you likely would have been impaled by those large fangs. As you push the spider off of your shield you notice it preparing to launch itself at you again.',
        options: [
            {
                text: 'Prepare yourself',
                nextText: 42
            }
        ]
    },
    {
        id: 500,
        text: 'skibidi'
    },
    {
        id: 59,
        text: 'As you follow the right path you feel at ease, the path leads you to an open field and with the Sun shining it is quite the peaceful sight. Following the path you come across a bridge that spans over a large ditch. You have no choice but to go over the bridge.',
        options: [
            {
                text: 'Walk over the bridge carefully',
                nextText: 60
            }
        ]
    },
    {
        id: 60,
        text: 'As you slowly begin crossing the bridge you look into the ditch and notice a huge orc stuck in the ditch. He looks dangerous and begins using a staff that propels powerful jets of water that look like they can do some major damage',
        options: [
            {
                text: 'Keep walking over the bridge',
                nextText: 61
            }
        ]
    },
    {
        id: 61,
        text: 'The orc in the ditch notices movement on the bridge above him and in a rage he uses his staff to destroy the bridge. You fall into the ditch with the giant beast.',
        options: [
            {
                text: 'Quickly get up to prepare yourself',
                nextText: 62
            }
        ]
    },
    {
        id: 62,
        text: 'The behemoth orc begins charging at you however hes not very fast',
        options: [
            {
                text: 'Try get out of the way',
                nextText:63
            },
            {
                text: 'Try to face the orc head on',
                nextText: 83
            },
            {
                text: 'Use your shield',
                requiredState: (currentState) => currentState.Shield,
                setState: {Shield: false},
                nextText: 84
            }
        ]
    },
    {
        id: 63,
        text: 'Despite the orc looking extrememly powerful its speed seems to be its weakness allowing you to easily dodge its brutal rush. The orc gets stuck in the wall of the ditch giving you an opporuinity to attack the beast.',
        options: [
            {
                text: 'Use your sword',
                nextText: 64
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.redStone,
                nextText: 73
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.purpleStone,
                nextText: 76
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.greenStone,
                nextText: 75
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.blueStone,
                nextText: 74
            }
        ]
    },
    {
        id: 64,
        text: 'While the beast is stuck you run up to it to try and deal some meaningful damage however his skin is rock solid and its near impossible to penetrate. It seems like the orc is going to free itself soon.',
        options: [
            {
                text: 'Keep attacking the creature',
                nextText: 65 
            },
            {
                text: 'Make some distance',
                nextText: 66
            }
        ]
    },
    {
        id: 65,
        text: 'You keep attacking the beast yet to no avail and it breaks free from the wall and catches you off guard! With one brutal swing the orc hits you with its gargantuan fist swiftly knocking you out leaving you at the mercy of the orc putting an end to your story.',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 66,
        text: 'Retreating seemed to be a good plan as the beast breaks free from the wall not too long after. The beast grabs his staff and begins to conjure water magic',
        options: [
            {
                text: 'Your scepter begins to glow',
                requiredState: (currentState) => currentState.blueStone,
                nextText: 71
            },
            {
                text: 'Run away',
                nextText: 67
            }
        ]
    },
    {
        id: 67,
        text: 'A blast of water erupts from the staff but it misses. You run further in the massive ditch to get away from the beast and you find three items however the orc is now charging at you again to try and catch up with you',
        options: [
            {
                text: 'A long rope with a hook at the end',
                nextText: 68
            },
            {
                text: 'A bow',
                nextText: 69
            },
            {
                text: 'A watch',
                nextText: 70
            }
        ]
    },
    {
        id: 68,
        text: 'The rope with hook allows you to escape the ditch after perfectly throwing the hook you begin to ascend quickly. The orc behind you roars in frustration as you escape the same prison it is incapable of escaping. Despite the not being able to defeat the Orc you are relieved to escape with your life.',
        Options: [
            {
                text: 'Continue on with your journey',
                nextText: 85
            }
        ]
    },
    {
        id: 69,
        text: 'Picking up the bow seemed to be a good idea. You could attack the orc while keeping your distance however that would be helpful if there were some arrows lying around. The orc catches up to you and with no real way to damage the beast without putting yourself at risk. You try and battle the beast for as long as you can however the creature isnt taking any damage. Soon you fall victim to your fatigue and the orc strikes you with its giant fist putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 70,
        text: 'You cant really understand what you were thinking when you picked up the watch but its safe to say you werent thinking logically. The orc catches up to you and with no real way to damage the beast without putting yourself at risk. You try and battle the beast for as long as you can however the creature isnt taking any damage. Soon you fall victim to your fatigue and the orc strikes you with its giant fist putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 71,
        text: 'The magic that comes from the orcs staff is extremely powerful, more so than the magic from your scepter. using your scepter you control the powerful jetstream of water and redirect the attack towards the Orc. This actually causes some proper damage and the orc roars in pain. The creature not being so intelligent charges another attack',
        options: [
            {
                text: 'Use your scepter again',
                nextText: 72
            },
        ]
    },
    {
        id: 72,
        text: 'You hit the creature again with a powerful stream of water, knocking the beast over. The orc drops his staff and the water stone shatters. This causes a huge amount of water to begin flowing from the staff and fills the huge ditch with water, you begin to float to the top of the ditch however the orc isnt so fortunate and is unable to float meaning he is unable to escape the ditch. The beast drowns at the bottom while you make a grand escape. The orcs greatest weapon happpened to be its greatest weakness.',
        options: [
            {
                text: 'Continue on with your journey',
                nextText: 85,
            }
        ]
    },
    {
        id: 73,
        text: 'You blast a fiery blaze at the orc in hopes of burning it however the orc soon escapes the wall and uses its water staff to put the fire out. the orc seems unphased by your attack and then puts out your fiery ambition with a powerful strike to your head knocking you out for good, putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 74,
        text: 'You blast a stream of water at the orc in hopes of causing some damage however the magic isnt near strong enough to damage the orc. The orc soon escapes the wall and is enraged by your attack and prepares an attack using its water staff.',
        options: [
            {
                text: 'Run away',
                nextText: 67
            },
            {
                text: 'Use your scepter',
                nextText: 71
            }
        ]
    },
    {
        id: 75,
        text: 'You use your scepter to produce a burst of venomous gas to emit from your scepter however the orc mereley coughs it off. You keep trying to suffocate the beast with the gas however it soon breaks free from the wall and hits you with a brutal swing of its fist kncoking you out putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 76,
        text: 'Using the scepter you charge up a blast of dark energy. By the time the behemoth escapes the wall you blast it with your scepter. This causes some proper damage and knocks the beast over, when the orc gets back up he begins to use his staff to conjur water magic',
        options: [
            {
                text: 'Try to use your scepter again',
                nextText: 77
            },
            {
                text: 'Try and dodge the attack',
                nextText: 78
            }
        ]
    },
    {
        id: 77,
        text: 'The orcs staff is faster than your scepter unfortunately and you take a powerful jetstream of water to the chest. The water penetrates your chest with ease and you fall to the ground after falling to the Orc putting an end to your story',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 78,
        text: 'You manage to dodge the incredibly poweful water stream which wouldve definitely have been fatal if it had landed, after dodging your given another opening to attack the beast, you hit the foul creature with another blast of dark energy. Landing another hit would likely prove fatal',
        options: [
            {
                text: 'Prepare another attack',
                nextText: 79
            }
        ]
    },
    {
        id: 80,
        text: 'The beast falls to its knees and it seems to be begging for mercy. Will you spare the Orc?',
        options: [
            {
                text: 'Spare the orc',
                nextText: 81
            },
            {
                text: 'Slay the orc',
                nextText: 82
            }
        ]
    },
    {
        id: 81,
        text: 'The orc shows immense gratitude for your mercy, so much so that you both begin to dig away at the wall of the ditch to escape the foul pit that has trapped you both. After you both get out of the ditch the orc grants you a gift, its a dragon scale a highly valuable resource in Eldoria. You both part ways as you have a mission to still complete.',
        options: [
            {
                text: 'Continue on with your journey',
                setState: {scale: true},
                nextText: 85
            }
        ]
    },
    {
        id: 82,
        text: 'You show the orc no mercy and slay it in cold blood. However you now realise you have no way of escaping the ditch. Stuck in the ditch with no way out you are left there alone a victim of your own blood lust putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 83, 
        text: 'Taking the orc head on was a very bad idea as the force of the orcs charge breaks all the ribs in your chest. The orc has won the battle before it even started putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 61
            }
        ]
    },
    {
        id: 84,
        text: 'You try and block the orcs charge with your shield however this launches you back and shatters your shield. After you recover from the attack you notice the beast is about to rush you again.',
        options: [
            {
                text: 'Dodge the attack',
                nextText: 63
            }
        ]
    },
    {
        id: 85,
        text: 'After following the path for some time you finally make it to the end of the crossroad and you notice another path joining and meeting the path ahead of you, you cant help but wonder what you would have encountered if you took a different path but there is no time to investigate you must save Eldoria from they tyrannical Zarathul',
        options: [
            {
                text: 'Keep walking',
                nextText: 86
            }
        ]
    },
    {
        id: 86,
        text: 'After following the path for some time you come across a suspicious looking chest in the middle of the road.',
        options: [
            {
                text: 'Open the chest',
                nextText: 87
            },
            {
                text: 'Ignore the chest',
                nextText: 99
            }
        ]
    },
    {
        id: 87,
        text: 'After trying to open the chest it suddenly springs open and within the chest is a bright gold glow however the chest suddenly reveals a huge set of teeth on the rim. Youve been attacked by a mimic',
        options: [
            {
                text: 'Try and take the treasure in the mimics mouth',
                nextText: 88
            },
            {
                text: 'Take a step back from the mimic',
                nextText: 89
            }
        ]
    },
    {
        id: 88,
        text: 'Reaching into the mimics mouth likely wasnt the wisest choice as as soon as you did the mimic closed its mouth with its sharp teeth easily cutting through your flesh. Putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 86
            }
        ]
    },
    {
        id: 89,
        text: 'As you make some distance from the mimic it begins to bounce towards you.',
        options: [
            {
                text: 'The ominous sword begins to glow',
                requiredState: (currentState) => currentState.darkSword,
                nextText: 95
            },
            {
                text: 'Attack the creature',
                nextText: 90
            }
        ]
    },
    {
        id: 90,
        text: 'The creature is clumsy and slow but its outer shell is extremely durable as your strikes seem to do little to no damage. The creature begins to attempt to bite you with its long slimy tongue attempting to grab you but iys still very easy to dodge but you need to make an effort to do so.',
        options: [
            {
                text: 'Focus on dodging',
                nextText: 94
            },
            {
                text: 'Keep trying to do damage to the creature',
                nextText: 91
            }
        ]
    },
    {
        id: 91,
        text: 'As the creature tries to grab you with its tongue you manage to cut the beasts tongue with ease. The insides of the creature is no where near as strong as the outer shell. After cutting the mimics tongue off it begins to try get away from you.',
        options: [
            {
                text: 'Chase the creature',
                nextText: 92
            },
            {
                text: 'Let it run away',
                nextText:93
            }
        ]
    },
    {
        id: 92,
        text: 'It seems like chasing the creature was exactly what it wasnted. As you run at it the mimic turns around and opens it jaw basically making you run directly into its mouth putting an end to your journey.',
        options: [
            { 
                text: 'Retry',
                nextText: 86
            }
        ]
    },
    {
        id: 93,
        text: 'There was no point in chasing the mimic so you let it run away pathetically. You have better things to than fight that creature.',
        options: [
            {
                text: 'Continue on with your journey',
                nextText: 99
            }
        ]
    },
    {
        id: 94,
        text: 'You dodge the creature with ease however you just cant find any way to do any damage the outer shell is too durable and youre starting to get tired, soon your movements become slow and the mimic is able to catch you, locking you between its teeth putting an end to your story.',
        options: [
            {
                text: 'Retry',
                nextText: 86
            }
        ]
    },
    { 
        id: 95,
        text: 'The ominous sword is again glowing in the presence of this creature like when fighting the skeletons and when you took the sword from the mysterious stranger',
        options: [
            {
                text: 'Attack the mimic with the ominous sword',
                nextText: 96
            }
        ]
    },
    {
        id: 96,
        text: 'Striking the mimic with the sword deals some major damage to the creature as huge sparks of energy are launched from the sword on the point of impact. This knocks the mimic on its side leaving it defenseless.',
        options: [
            {
                text: 'Leave the mimic',
                nextText: 97
            },
            {
                text: 'Kill the mimic',
                nextText: 98
            }
        ]
    },
    {
        id: 97,
        text: 'As you turn around to leave the mimic, the creature grabs you with its tongue and pulls you into its mouth putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 86
            }
        ]
    },
    {
        id: 98,
        text: 'You walk up to the mimic and and quickly slay the beast with ease. You were hoping it would have some treasure inside it but it seems the glow you saw earlier was merely an illusion to lure in prey. Youre dissapointed but you decide to keep following the path',
        options: [
            {
                text: 'Continue on with your journey',
                nextText: 99
            }
        ]
    },
    {
        id: 99,
        text: 'You walk on, strictly following the path, desperate to get to The Obsidian Spire. You notice a carriage with a man that calls you over.',
        options: [
            {
                text: 'Walk over to the man',
                nextText: 100
            }
        ]
    },
    {
        id: 100,
        text: 'The man wants to trade with you. For a dragon scale he will offer a dragon staff, a staff that can calm draconic beings. For a spider eye he offers a cloak that when put on will allow the wearer to be completely invisible to the naked eye.',
        options: [
            {
                text: 'Take the draconic staff',
                requiredState: (currentState) => currentState.scale,
                setState: {scale: false, staff: true},
                nextText: 101
            },
            {
                text: 'Take the cloak',
                requiredState: (currentState) => currentState.eye,
                setState: {eye: false, cloak: true},
                nextText: 102
            },
            {
                text: 'Leave the man and continue on your journey',
                nextText: 103
            }
        ]
    },
    {
        id: 101,
        text: 'Taking your newly equipped dragon staff you part ways with the man and continue on following the path, youre so close to the Obisdian Spire.',
        options: [
            {
                text: 'Keep following the path until you see the mountains in the distance',
                nextText: 104
            }
        ]
    },
    {
        id: 102,
        text: 'Taking your newly equipped cloak you part ways with the man and continue on following the path, youre so close to the Obisdian Spire.',
        options: [
            {
                text: 'Keep following the path until you see the mountains in the distance',
                nextText: 104
            }
        ]
    },
    {
        id: 103, 
        text: 'You dont take any of the mans offers and part ways with him. You continue on following the path, youre so close to the Obsidian Spire.',
        options: [
            {
                text: 'Keep following the path until you see the mountains in the distance',
                nextText: 104
            }
        ]
    },
    {
        id: 104,
        text: 'The mountains are gargantuan and they pierce the clouds. The sight ahead of you looks extremely menacing and its not too late to turn back, hero.',
        options: [
            {
                text: 'Begin your ascent of the mountains',
                nextText: 105
            }
        ]
    },
    {
        id: 105, 
        text: 'During your ascent you begin to hear loud roars that echo in the dangerous environment you are in. You can only wonder what is coming.',
        options: [
            {
                text: 'Keep pushing on',
                nextText: 106
            }
        ]
    },
    {
        id: 106,
        text: 'During your ascent you discover a wide variety of corpses of multiple races ranging from trolls, orcs all the way to other adventurers like yourself all you can do is hope you dont end up like them. You cant end up like them you have to save Eldoria. After clearing your head you hear somneone calling to you, you turn around a see a man sitting in a cavern.',
        options: [
            {
                text: 'Walk towards the man',
                nextText: 107
            },
            {
                text: 'Ignore the man',
                nextText: 500
            }
        ]
    },
    {
        id: 107,
        text: '"Greetings hero, you are a brave soul for attempting to ascend these mountains for the guardian of these peaks has slaughtered all of those who came before you. They all attempted to slay the sorcerer above the Obisidian Spire."',
        options: [
            {
                text: 'Ask about the guardian',
                nextText: 108
            },
            {
                text: 'Ask about Zarathul',
                nextText: 109
            }
        ]
    },
    {
        id: 108,
        text: '"The guardian of the peaks is a fierce tyrant that is swift in its executions of those who tresspass upon its territory.',
        options: [
            {
                text: 'Ask about Zarathul',
                nextText: 109
            },
            {
                text: 'Bid farewell to the man',
                nextText: 110
            }
        ]
    },
    {
        id: 109,
        text: '"Some say Zarathul is planning to destroy Eldoria with a dark, powerful spell while I believe he is trying to restore Eldoria and has devoted his life to keeping the realm together."',
        options: [
            {
                text: 'Try and convince the man that Zarathul is evil',
                nextText: 111
            },
            {
                text: 'Bid farewell to the man',
                nextText: 110
            }
        ]
    },
    {
        id: 111,
        text: '"Nonsense you fool! I live upon these mountains and I have seen the sorcerer myself! He is the only reason we live today!"',
        options: [
            {
                text: 'Kill the man',
                setState: {corrupt: true },
                nextText: 112
            },
            {
                text: 'Bid farewell to the man',
                nextText: 110
            }
        ]
    },
    {
        id: 112,
        text: 'You strike the man down with your sword. Hes clearly worshipping the evil sorcerer and needs to be killed before he causes you any trouble.',
        options: [
            {
                text: 'Keep ascending the mountains',
                nextText: 113
            }
        ]
    },
    {
        id: 110,
        text: 'You bid farewell to the man and leave him be.',
        options: [
            {
                text: 'Keep ascending the mountains',
                nextText: 113
            }
        ]
    },
    {
        id: 113,
        text: 'As you continue your ascent up the mountains you notice a huge dragon flying high above you. It has likely noticed you and it seems to be following you.',
        options: [
            {
                text: 'Ignore the dragon',
                nextText: 114
            },
            {
                text: 'Hide in a small cavern',
                nextText: 115
            }
        ]
    },
    {
        id: 115,
        text: 'You run into a small crevice in the side of the mountains to try and hope the dragon loses you.',
        options: [
            {
                text: 'You wait for half an hour in hopes it leaves',
                nextText: 116
            },
            {
                text: 'Use your cloak',
                requiredState: (currentState) => currentState.cloak,
                nextText: 127
            }
        ]
    },
    {
        id: 116, 
        text: 'After leaving the crevice you notice the dragon is no where to be seen. Breathing a sigh of relief you keep ascending the mountains. After scaling a bit more of the mountain you are met with the terrifying sight of the dragon right in front of you looking down at you.',
        options: [
            {
                text: 'Prepare yourself for battle',
                nextText: 117
            },
        ]
    },
    {
        id: 117,
        text: 'As you unsheathe your sword you stupidly rush at the giant creature and begin slashing at its leg. The dragon roars at you and and opens its mouth likely preparing an attack.',
        options: [
            {
                text: 'Use your shield',
                requiredState: (currentState) => currentState.Shield,
                setState: {Shield: false},
                nextText: 128
            },
            {
                text: 'Keep attacking the Dragon',
                nextText: 118
            },
            {
                text: 'Run underneath the dragon',
                nextText: 119
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.redStone,
                nextText: 134
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.blueStone,
                nextText: 135
            }
        ]
    },
    {
        id: 118,
        text: 'The dragon unleashes an overwhelming flame from its mouth completely engulfing you in smoldering fire putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 117
            }
        ]
    },
    {
        id: 119, 
        text: 'Noticing that the dragon is about to use some form of attack you run underneath it to try and avoid its attack. Fortunately this worked as a huge burst of flame engulfs where you was originally standing.',
        options: [
            {
                text: 'Attack the dragon',
                nextText: 121
            },
            {
                text: 'Try and hide behind a boulder',
                nextText: 120
            }
        ]
    },
    {
        id: 120,
        text: 'Hiding behind the boulder likely wasnt the best idea. The dragon has your scent now and theres no hiding from it. The dragon slams the boulder with its weight smashing the boulder as well as your body, putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 117
            }
        ]
    },
    {
        id: 121,
        text: 'You manage to get a few good hits in underneath the dragon tearing away at its rough scales. The dragon immediately flies into the air and begins to dive straight back down towards you intending to slam you with its weight.',
        options: [
            {
                text: 'Try and dodge the dragon',
                nextText: 122
            },
            {
                text: 'Try and hide behind a boulder',
                nextText: 120
            }
        ]
    },
    {
        id: 122,
        text: 'You manage to evade the attack and the dragon gets itself lodged into the side of the mountain giving you time to attack the beast.',
        options: [
            {
                text: 'Attack from the ground',
                nextText: 123
            },
            {
                text: 'Climb onto the dragons back',
                nextText: 124
            }
        ]
    },
    {
        id: 123, 
        text: 'Attacking from the ground seemed like a safe option however you failed to account for the beasts huge tail that instantly broke every bone in your body after being hit by it. Putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 117
            }
        ]
    },
    {
        id: 124,
        text: 'After climbing onto the dragons back you target its wing to stop it from flying. After that the dragon is left vulnerable to your attacks.',
        options: [
            {
                text: 'Attack using your sword',
                nextText: 125
            },
            {
                text: 'The ominous sword glows',
                requiredState: (currentState) => currentState.darkSword,
                setState: {heart: true},
                nextText: 126
            }
        ]
    },
    {
        id: 125,
        text: 'You hack away at the back of the dragon, you are causing some serious and the dragon desperately struggles. Soon the dragon manages to shake you off and it makes a hasty retreat. You are right infront of the Obsidian Spire.',
        options: [
            {
                text: 'Begin climbing the Obsidian Spire',
                nextText: 136
            }
        ]
    },
    {
        id: 126, 
        text: 'Without thinking you use the ominous sword and stab the dragon the back! A burst of energy flies from the sword and the dragon roars in agony as its now lifeless body falls to the ground, After this you retrieve the dragons heart as a trophy for slaying the great beast. After a short rest you notice youre right infront of the Obsidian Spire. You have defeated the dragon.',
        options: [
            {
                text: 'Begin climbing the Obisidan Spire',
                nextText: 136
            }
        ]
    },
    {
        id: 127,
        text: 'Donning your cloak your whole body becomes invisible. You leave the crevice to see the dragon above you still but it has no idea where you are. It flys above where you were hiding waiting for you to leave unknowing that you have already left. You keep walking until you reach the Obisidan Spire',
        options: [
            {
                text: 'Begin climbing the Obisidian Spire',
                setState: {nheart: true},
                nextText: 136
            }
        ]
    },
    {
        id: 128,
        text: 'As you pull up your shield you feel an intense heat all around you. The dragon has engulfed where youre standing in a wide flame. Fortunately your trusty shield has managed to redirect the fire away from you and keep you safe however your shield has melted leaving you defensless from another attack like that. Unfortunately for you the dragon appears to be charging up another fire blast.',
        options: [
            {
                text: 'Run underneath the dragon',
                nextText: 119
            },
            {
                text: 'Use your draconic staff',
                requiredState: (currentState) => currentState.staff,
                nextText: 129
            }
        ]
    },
    {
        id: 129,
        text: 'As you pull out the staff it emits a low humming sound that the dragon reacts harshly to. The dragon stops its attack and stares at you with its stoic eyes, and suddenly the creature begins to communicate with you. "What brings you to my peaks Human?"',
        options: [
            {
                text: 'Explain your mission to the dragon',
                nextText: 130
            }
        ]
    },
    {
        id: 130,
        text: 'The dragon looks confused and roars out "Foolish human! You have been deceived by Aurelius! Zarathul is no tyrannous sorcerer! All of you adventurers believe the same story! Zarathul is the one keeping Eldoria alive, if not for him then Eldoria would have collapsed and have fell by the maniacle Aurelius!',
        options: [
            {
                text: 'Ask how Aurelius would collpase Eldoria',
                nextText: 131
            },
            {
                text: 'Ask how Zarathul is saving Eldoria',
                nextText: 132
            }
        ]
    },
    {
        id: 131,
        text: 'Two decades ago Aurelius cast a world wide spell that would bring the lost realm into Eldoria. This would bring malicious evil races into Eldoria that would slaughter everything they see. They would all serve under Aurelius and he would rule Eldoria as the Great Sorcerer of the Lost Realm',
        options: [
            {
                text: 'Ask how Zarathul is saving Eldoria',
                nextText: 132
            },
        ]
    },
    {
        id: 132,
        text: 'Zarathul has devoted his life to warding off the dark realm. He stands above the Obsidian Spire throughout his whole life warding off the Lost Realm using his magic! I have devoted my life to protecting him. Aurelius sends foolish adventurers such as yourself to stop him as he is far too cowardly to do so himself! See for yourself adventurer! I will let you ascend The Obsidian Spire',
        options: [
            {
                text: 'Ascend The Obsidian Spire',
                setState: {nheart: true},
                nextText: 136
            },
            {
                text: 'The ominous sword glows',
                requiredState: (currentState) => currentState.darkSword,
                setState: {heart: true},
                nextText: 133
            }
        ]
    },
    {
        id: 133,
        text: 'You dont know why but you urge to kill the dragon infront of you. Without warning you stab the dragon with the ominous sword! A burst of energy flies from the sword and the dragon roars in agony as its now lifeless body falls to the ground, After this you retrieve the dragons heart as a trophy for slaying the great beast. After a short rest you notice youre right infront of the Obsidian Spire. You have defeated the dragon.',
        options: [
            {
                text: 'Ascend The Obsidian Spire',
                nextText: 136
            }
        ]
    },
    {
        id: 134,
        text: 'You use the fire stone and let the fire engulf you. You dont feel a thing and you manage to take the attack without any damage. The dragon looks as if its going to attack you again.',
        options: [
            {
                text: 'Run underneath the dragon',
                nextText: 119
            },
            {
                text: 'Use your draconic staff',
                requiredState: (currentState) => currentState.staff,
                nextText: 129
            }
        ]
    },
    {
        id: 135,
        text: 'You use the water stone and a shield of water blocks the stopping the dragon from engulfing you with its scorching flame. You manage to block the attack with the water shield. The dragon looks as if its going to attack you again.',
        options: [
            {
                text: 'Run underneath the dragon',
                nextText: 119
            },
            {
                text: 'Use your draconic staff',
                requiredState: (currentState) => currentState.staff,
                nextText: 129
            }
        ]
    },
    {
        id: 136,
        text: 'When you ascend the spire you see Zarathul in front of you. He looks busy with casting a spell however he has noticed you. "Hero! I know why you are here! Aurelius has sent you! I must plead with you hero! I am the only one saving Eldoria from the Lost Realm, if you interrupt me then Eldoria will fall.',
        options: [
            {
                text: 'Ask about Aurelius',
                nextText: 137
            }
        ]
    },
    {
        id: 137,
        text: 'As if on cue, the mysterious stranger that sent you on this journey makes an appearance. "Ignore him hero! Zarathul is the one who will destroy Eldoria! You must stop him now!',
        options: [
            {
                text: 'Attack Zarathul',
                nextText: 138
            },
            {
                text: 'Attack Aurelius',
                nextText: 152
            }
        ]
    },
    {
        id: 138,
        text: 'After attacking Zarathul hes forced to stop casting his spell. "You Fool!" he yells and begins casting more magic to fight you. A purple glow emits from his palm.',
        options: [
            {
                text: 'Try and dodge the attack',
                nextText: 140
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.purpleStone,
                nextText: 151
            },
            {
                text: 'Try close the distance',
                nextText: 139
            }
        ]

    },
    {
        id: 139,
        text: 'Running at Zarathul carelessly wasnt the best idea. Zarathul hits you directly with his purple magic. Your body is completely vaporised putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 138
            }
        ]
    },
    {
        id: 140,
        text: 'You narrowly dodge the attack from the sorcerer and notice Zarathul is trying to cast a shield. If he casts a shield it may be quite troublesome to defeat him',
        options: [
            {
                text: 'Run at Zarathul',
                nextText: 142
            },
            {
                text: 'Stay defensive',
                nextText: 141
            }
        ]
    },
    {
        id: 141,
        text: 'You give Zarathul time to cast his shield. This dooms you for the rest of the fight. You fight Zarathul valiantly however there is no breaking through his shield. After some time you succumb to fatigue and Zarathul swiftly puts an end to your story',
        options: [
            {
                text: 'Retry',
                nextText: 138
            }
        ]
    },
    {
        id: 142,
        text: 'You rush towards Zarathul and stop him from casting his shield spell. He responds by releasing a venomous gas from his palms.',
        options: [
            {
                text: 'Ignore the gas',
                nextText: 143
            },
            {
                text: 'Back away from Zarathul',
                nextText: 144
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.greenStone,
                nextText: 150
            }
        ]
    },
    {
        id: 143,
        text: 'You ignore the gas and as you do you go to strike Zarathul with your sword however you fall to the ground as you choke on the gas. "You should have been more careful, hero" Zarathul then executes you putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 138
            }
        ]
    },
    {
        id: 144,
        text: 'You are forced to make distance between yourself and Zarathul making things increasingly difficult. Zarathul begins casting a water spell.',
        options: [
            {
                text: 'Block using your sword',
                nextText: 145
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.blueStone,
                nextText: 148
            }
        ]
    },
    {
        id: 145,
        text: 'With incredible speed and fast thinking you pull your sword infront of you and manage to perfectly block the attack however your sword is knocked out of your hand leaving you with only your scepter. Zarathuls palms shine red and you suddenly smell smoke',
        options: [
            {
                text: 'Ready yourself',
                nextText: 146
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.redStone,
                nextText: 147
            }
        ]
    },
    {
        id: 146,
        text: 'Left out of options you try and just dodge Zarathuls attacks but soon you fall fatigued and soon Zarathul catches you off guard and catches you with his fire magic. He engulfs you in a scorching flame putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 138
            }
        ]
    },
    {
        id: 147,
        text: 'You redirect Zarathuls flame back towards him and he is engulfed in scorching hot flames. The sorcerer screams in agony and soon falls to the ground after succumbing to his wounds. You have defeated Zarathul.',
        options: [
            {
                text: 'Talk to Aurelius',
                nextText: 165
            }
        ]
    },
    {
        id: 148,
        text: 'You redirect the water back towards Zarathul. This knocks him over and gives you an opening to strike',
        options: [
            {
                text: 'Rush Zarathul',
                nextText: 149
            }
        ]
    },
    {
        id: 149,
        text: 'Zarathul falls to you as you stab him with your trusty sword. The sorcerer falls to the ground lifeless. You have defeated Zarathul.',
        options: [
            {
                text: 'Talk to Aurelius',
                nextText: 165
            }
        ]
    },
    {
        id: 150,
        text: 'Your scepter protects you from the gas. This suprises Zarathul leaving him open. You stab Zarathul with your sword and Zarathul takes his last breath as he falls to the ground lifeless. You have defeated Zarathul.',
        options: [
            {
                text: 'Talk to Aurelius',
                nextText: 165
            }
        ]
    },
    {
        id: 151,
        text: 'You run straight at Zarathul. The blast hits you but your scepter protects you from the magic. To zarathuls suprise youre right infront of him. Zarathul is stabbed by your sword. His lifeless body falls to the ground after taking his last breath. You have defeated Zarathul',
        options: [
            {
                text: 'Talk to Aurelius',
                nextText: 165
            }
        ]
    },
    {
        id: 152,
        text: 'After attacking Aurelius he looks shocked! "You Traitor! Nevermind once I defeat you I will rule Eldoria for myself!" he yells and begins casting more magic to fight you. A blue glow emits from his palm.',
        options: [
            {
                text: 'Try close the distance',
                nextText: 155
            },
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.blueStone,
                nextText: 154
            },
            {
                text: 'Try dodge the attack',
                nextText: 153
            }
        ]
    },
    {
        id: 153,
        text: 'After attempting to dodge your hit by a blast of blue energy its far quicker than the purple lightning youve encountered before but doesnt hit as hard. You see Aurelius going to cast a shield',
        options: [
            {
                text: 'Run straight at him',
                nextText: 156
            },
            {
                text: 'Fight defensively',
                nextText: 157
            }
        ]
    },
    {
        id: 155, 
        text: 'Trying to close the distance didnt work as you planned. with no attempt to dodge the attack youre hit with the full force of the blue energy. You drop to the floor lifeless putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 152
            }
        ]
    },
    {
        id: 154,
        text: 'Seeing the blue light from Aurelius hand you assume hes going to use water magic however youre sorely mistaken. He hits you with a blast of blue energy that rocks you to your core! Taking the full brunto of the attack you drop to the floor lifeless putting an end to your journey',
        options: [
            {
                text: 'Retry',
                nextText: 152
            }
        ]
    },
    {
        id: 156,
        text: 'Stopping Aurelius from casting a shield would have made sense however he was bluffing as you run at him he casts a different spell and blasts you with that blue energy from before causing you to drop to the floor lifeless again.',
        options: [
            {
                text: 'Retry',
                nextText: 152
            }
        ]
    },
    {
        id: 157,
        text: 'Perhaps it was luck or pure skill but you managed to call Aurelius on his bluff. He was never casting a shield spell and when he shot another beam of blue energy you were able to dodge it. However not leaving you much time he casts a fire spell',
        options: [
            {
                text: 'Use your scepter',
                requiredState: (currentState) => currentState.redStone,
                nextText: 158
            },
            {
                text: 'Dodge the fire attack',
                nextText: 159
            }
        ]
    },
    {
        id: 158,
        text: 'You redirect Aurelius fire back at him. Engulfing him in scorching hot flame. He screams in agony and soon succumbs to the blaze of his own creation falling to the ground. You have defeated Aurelius',
        options: [
            {
                text: 'Talk to Zarathul',
                nextText: 600
            }
        ]
    },
    {
        id: 159,
        text: 'You narrowly dodge the blaze that scorches from his palm',
        options: [
            {
                text: 'Try and kill Aurelius right there',
                requiredState: (currentState) => currentState.ndarkSword,
                nextText: 160
            },
            {
                text: 'Try and kill Aurelius right there',
                requiredState: (currentState) => currentState.darkSword,
                nextText: 161
            },
            {
                text: 'Try and cut off his hand',
                nextText: 162
            }
        ]
    },
    {
        id: 160,
        text: 'You try to kill him right there however when you go to stab Aurelius you miss his vitals and now youre vulnerable. Aurelius releases another blast of blue energy that pierces your body. You fall to the ground lifeless you was so close to defeating him however Aurelius bested you putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText: 152
            }
        ]
    },
    {
        id: 161,
        text: 'You try to kill Aurelius right there. You stab him with the ominous sword that he gave you at the start of the journey putting an end to the tyrannical sorcerer on the spot. You have defeated Aurelius.',
        options: [
            {
                text: 'Talk to Zarathul',
                nextText: 600
            }
        ]
    },
    {
        id: 162,
        text: 'You slice Aurelius hand off in one clean slice! The sorcerer screams in pain and in a panic he goes to conjure a spell it looks dangerous',
        options: [
            {
                text: 'Try and dodge the spell',
                nextText: 163
            },
            {
                text: 'Try and stop him from casting the spell',
                nextText: 164
            }
        ]
    },
    {
        id: 163,
        text: 'You attempt to dodge the spell however aurelius cast a spell that covers the whole Obsidian Spire. You and Zarathul are instantly vaporized by the attack and you fall to the tyrannical sorcerer putting an end to your journey.',
        options: [
            {
                text: 'Retry',
                nextText:152
            }
        ]
    },
    {
        id: 164,
        text: 'You run at Aurelius in an attempt to stop him from casting the spell. You manage to slice off his other hand and while he screams in pain you pierce his heart in one swift strike. You have defeated Aurelius.',
        options: [
            {
                text: 'Talk to Aurelius',
                nextText: 600
            }
        ]
    },
    {
        id: 165,
        text: '"Well done hero! You have served me well! Eldoria will fall thanks to you and the Lost Realm will take over and I shall rule. You have no use for me now mortal! All I need is to slay the dragon and sacrifice it the Lost Realm.',
        options: [
            {
                text: 'Continue',
                requiredState: (currentState) => currentState.nheart,
                nextText: 166
            },
            {
                text: 'Continue',
                requiredState: (currentState) => currentState.heart,
                nextText: 167
            }
        ]
    },
    {
        id: 167,
        text: 'You sacrifice the dragon heart yourself to the Lost Realm and Aurelius screams in anger "No! How did you slay the dragon?! That is impossible for a mortal such as yourself! Aurelius screams in disdain his plan to become the ruler of Eldoria ruined because of you! If you cant be the hero of Eldoria, you will rule the Lost Realm yourself and conquer the realms.',
    },
    {
        id: 166,
        text: 'Aurelius laughs maniacally as the Lost Realm consumes Eldoria. Youre no hero, you helped a tyrant tear down your home! "Thank you hero! But I no longer have use for you" is the last thing you hear before you draw your last breath to Aurelius.',
    },
    {
        id: 168,
        text: '"Good job hero! You have managed to destroy the tyrannical sorcerer and now we can destroy the link between the Lost Realm and Eldoria! The dragon that defends these peaks will be needed we must call upon him only he can ward off the Lost Realm!',
        options: [
            {
                text: 'Continue',
                requiredState: (currentState) => currentState.nheart,
                nextText: 169
            },
            {
                text: 'Continue',
                requiredState: (currentState) => currentState.heart,
                nextText: 170
            }
        ] 
    },
    {
        id: 169,
        text: 'The dragon you encountered earlier arrives and helps Zarathul in closing the link between the Lost Realm and Eldoria. "Thanks to you hero we have saved Eldoria and the Lost Realm has been sealed off forever"',
    },
    {
        id: 170,
        text: 'Revealing that you had slayed the dragon Zarathul looks shocked "but how? There is no time we must sacrifice the dragons heart in order to force the Lost Realm to obey us! We must command the Lost Realm to break the link it has with Eldoria! However we will be banished in the Lost Realm. The ruler of the Lost Realm may never leave it so if we break the link with Eldoria we will be forced to live out our days in the Lost Realm." That is what you both do. sacrificing yourselves for your Eldoria, your home.',
    }



]

startGame()
