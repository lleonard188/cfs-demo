if (Meteor.isClient) {

    var Images = new FS.Collection("images");

    Template.demo.events({
        'change .imageUploader': function(event, template) {
            var files = event.target.files;
            for (var i = 0, ln = files.length; i < ln; i++) {
                 Images.insert(files[i], function (err, id) {
                    //Inserted new doc with _id = id, and kicked off the data upload using DDP
                });
            }
        }
    });

}

if (Meteor.isServer) {
  
    var Images = new FS.Collection("images", {
        store: new FS.FileSystemStore("images", "~/uploads"),
        beforeSave: function () {
            this.gm({ imageMagick: true }).resize(60, 60).blur(7, 3).save();
        }
    });



}
