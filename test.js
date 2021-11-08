db.posts.insert({
    title: 'hej',
    likes: 4,
    tags: ['hej','test'],
    user: {
        name: 'john doe',
        status: 'author'
    },
})
//sletter alt og tilføjer
db.posts.update({title: 'hej'}, 
{
    title: 'hej',
    body: 'New updated'
},
{
    upsert: true
}
)
// tilføjer og ændre 
db.posts.update({title: 'hej'}, 
{
    $set: {
        title: 'hej2',
        category: 'eksamen'
    }   
}
)