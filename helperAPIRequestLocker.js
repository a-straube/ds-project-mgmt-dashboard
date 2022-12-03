// GET MEMBERS
Trello.get('boards/QCJDklm5/members', function(members) {
    $.each(members, function(ix, member) {
        console.log(member);
    })
}, function (error){
    console.log(error);
});