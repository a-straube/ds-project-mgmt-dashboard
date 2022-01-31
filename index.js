// List IDs
// To Do:    5ad3c6eb79d93844dc6b0b40
// Phase 1:  61f613024aa7d53bc468757b
// Phase 2:  61f61307219e3e3bda928af0
// Phase 3:  61f6130c6e9f198e257e8cb2
// QA:       5ad3c6eb79d93844dc6b0b42
// Complete: 5ad3c6eb79d93844dc6b0b41

const teamMembers = [
    {
        name: 'Marcus Aurelius',
        trello_id: '61f6183fe803bd5eee4e525c'
    },
    {
        name: 'Rosa Parks',
        trello_id: '5ad3c6e888a4bb8ba338d865'
    },
    {
        name: 'Yogi Berra',
        trello_id: '61f61858a589f81b521b717a'
    }
];

// Phase count HTML elements
let elToDoCount = document.getElementById('toDoCount'),
    elPhaseOneCount = document.getElementById('phaseOneCount'),
    elPhaseTwoCount = document.getElementById('phaseTwoCount'),
    elPhaseThreeCount = document.getElementById('phaseThreeCount'),
    elQACount = document.getElementById('qaCount'),
    elCompleteCount = document.getElementById('completeCount');

// Phase Totals
let toDoCount = 0,
    phaseOneCount = 0,
    phaseTwoCount = 0,
    phaseThreeCount = 0,
    qaCount = 0,
    completeCount = 0;

// Department Totals
let adminCount = 0,
    devCount = 0,
    hrCount = 0,
    itCount = 0,
    productionCount = 0,
    salesCount = 0;

calcDepartmentTotals = (card) => {
    let cardLabels = card.labels;
    cardLabels.forEach(label => {
        let department = label.name;
        if(department==='Admin') {
            adminCount++;
        } else if(department==='Dev') {
            devCount++;
        } else if(department==='HR') {
            hrCount++;
        } else if(department==='IT') {
            itCount++;
        } else if(department==='Production') {
            productionCount++;
        } else if(department==='Sales') {
            salesCount++;
        }
    });
}

calcPhaseTotals = (card) => {
    let cardListID = card.idList;
    if(cardListID==='5ad3c6eb79d93844dc6b0b40') {
        toDoCount++;
    } else if(cardListID==='61f613024aa7d53bc468757b') {
        phaseOneCount++;
    } else if(cardListID==='61f61307219e3e3bda928af0') {
        phaseTwoCount++;
    } else if(cardListID==='61f6130c6e9f198e257e8cb2') {
        phaseThreeCount++;
    } else if(cardListID==='5ad3c6eb79d93844dc6b0b42') {
        qaCount++;
    } else if(cardListID==='5ad3c6eb79d93844dc6b0b41') {
        completeCount++;
    }
}

fillProductionPhaseDataList = () => {
    elToDoCount.innerHTML = toDoCount;
    elPhaseOneCount.innerHTML = phaseOneCount;
    elPhaseTwoCount.innerHTML = phaseTwoCount;
    elPhaseThreeCount.innerHTML = phaseThreeCount;
    elQACount.innerHTML = qaCount;
    elCompleteCount.innerHTML = completeCount;
}

makePhaseChart = () => {
    fillProductionPhaseDataList();
    const ctx = document.getElementById('productionPhaseChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['To Do', 'Phase 1', 'Phase 2', 'Phase 3', 'QA', 'Complete'],
            datasets: [{
                data: [toDoCount, phaseOneCount, phaseTwoCount, phaseThreeCount, qaCount, completeCount],
                backgroundColor: '#000000',
                borderColor: '#000000',
                borderWidth: 1
            }]
        }
    });
}

Trello.get('boards/QCJDklm5/cards', function(cards) {
    $.each(cards, function(ix, card) {
        console.log(card);
        calcPhaseTotals(card);
    })
    makePhaseChart();
}, function (error){
    console.log(error);
});

