// Create the collection for LinkedIn connections
Connections = new Meteor.Collection("Connections");
Skills = new Meteor.Collection("Skills");
People = new Meteor.Collection("People");


if (Meteor.isClient) {
  allSkills = [];

  Template.hello.profile = function () {
    // var html = 

    return "";
  };

  Template.hello.events({

    'click input' : function () {
      // template data, if any, is available in 'this'
      Meteor.loginWithLinkedin({}, function(err){
        if(err){
          console.log("Login: " + err);
        } else{
          console.log("Login: Success");
        }
      });
      // Meteor.getLinkedinProfile({}, function(err){
      //   // Your error function goes here
      //   console.log(err);
      // });
    }
  });

  Template.hello.helpers({
    
   /* score: function(){
      hackerScore = 0;
      hipsterScore = 0;
      hustlerScore = 0;
      hackerSkills = ["Python"];
      hipsterSkills = [""];
      hustlerSkills = [""];
      for(var i in allSkills){
        console.log(i + ': ' + allSkills[i]);
        if($.inArray(hackerSkills, allSkills[i].name)){
          hackerScore++;
        }
        if($.inArray(hipsterSkills, allSkills[i].name)){
          hipsterScore++;
        }
        if($.inArray(hustlerSkills, allSkills[i].name)){
          hustlerScore++;
        }
      }

      return [hackerScore, hipsterScore, hustlerScore];
    },*/
    skills: function(){
      return Skills.find();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    allSkills = [];

    // API Key: 774knwz4aoj84b
    // Secret Key: 18Odf7J6JuGn9UaU
    // OAuth User Token: 67cee328-15c9-460e-9f7e-dbe5e527bb34
    // OAuth User Secret: 55b807e9-e05a-4c85-a2d4-fc3c73acba97
    Accounts.loginServiceConfiguration.remove({
      service: "linkedin"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "linkedin",
      clientId: "774knwz4aoj84b",
      secret: "18Odf7J6JuGn9UaU"
    });
  });
}
