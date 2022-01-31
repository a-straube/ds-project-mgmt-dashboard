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

Trello.get('boards/QCJDklm5/cards', function(cards) {
    $.each(cards, function(ix, card) {
        console.log(card);
    })
}, function (error){
    console.log(error);
});

