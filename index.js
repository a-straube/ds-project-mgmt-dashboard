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

Trello.get('boards/QCJDklm5/cards', function(cards) {
    $.each(cards, function(ix, card) {
        console.log(card);
    })
}, function (error){
    console.log(error);
});

