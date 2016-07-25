// Establish a Socket.io connection
const socket = io()

// Set up Feathers client side
const app = feathers()
  .configure(feathers.socketio(socket))
  .configure(feathers.hooks())
  .configure(feathers.authentication({ storage: window.localStorage }));

const documentsService = app.service('/documents');
const usersService= app.service('/users');
const uploadService = app.service('uploads');

Vue.component('topnav', {
  template: '#topnav-template',
  methods: {
    showLogin: function(){
      this.$parent.login = true;
      this.$parent.logsign = true;
    },
    showSignup: function(){
      this.$parent.signup= true;
      this.$parent.logsign = true;
    }
  }
})

Vue.component('login', {
  template: '#login-template'
})

Vue.component('signup', {
  template: '#signup-template',
  methods: {
    doSignup: function(){
      this.$parent.signup = false;
      usersService.create({email: this.$parent.email, password: this.$parent.password}, {}).
        then( function (response) {
          vm.doLogin()
        })
    }
  }
})

Vue.component('doclist', {
  template: '#doclist-template'
})

Vue.component('document', {
    template: '#document-template',
    props: ['document'],
    methods: {
        deleteDocument: function (document) {
            vm.documents.$remove(document);
            documentsService.remove(document.id, {});
            uploadService.remove(document.fileName);
        },
        editDocument: function (document) {
          document.editing = true;
        },
        updateDocument: function (document) {
            documentsService.patch(document.id, document, {});
            //Set editing to false to show actions again and hide the inputs
            document.editing = false;
        },
        storeDocument: function (document) {
            documentsService.create(document, {}).then(function (response) {
              Vue.set(document, 'id', response.id);
              document.editing = false;
            })
        },
        downloadDocument: function(document) {
          uploadService.get(document.fileName).then(function(fileObject) {
            const blob = dataURLtoBlob(fileObject.uri);
            saveAs(blob, fileObject.id);
          })
        }
    }
})

vm = new Vue({
  el: '#v-app',
  data: {
    logsign: false,
    login: false,
    signup: false,
    docList: false,
    documents: [],
    email: "",
    password: "",
    jwt: ""
  },
  ready() {
    documentsService.on('created', document => {
      if (!this.documents.find(x=> x.id === document.id)){
        this.documents.push(document)   // add document to array only if it's not there already
      }
    });
    documentsService.on('removed', document => {
      const index = this.documents.findIndex(x=> x.id === document.id); // Locate document in array using unique id
      if (index > -1) {
        this.documents.splice(index, 1);
      }
    });
    documentsService.on('patched', document => {
      const index = this.documents.findIndex(x=> x.id === document.id); // Locate document in array using unique id
      //vm.$set('documents[index]', document);
      document.editing = false;
      this.documents.$set(index, document);
      //this.documents[index] = document;
    });

  },
  methods: {
   createDocument: function (fileId) {
      var newDocument = {
          title: "",
          author: "",
          text: "",
          editing: true,
          fileName: fileId
      };
      this.documents.push(newDocument);
    },
    fetchDocs: function (page_url) {

      documentsService.find().then(function(result) {
        if (result.data) {
            var documentsReady = result.data.map(function (document) {
              document.editing = false;
              return document;
          })
            // set data on vm
            vm.$set('documents', documentsReady);            
          }
      }).catch(function(error) {
        console.log('Error finding messages', error);
      });

    },
    doLogin: function(){
      this.login = false;

      app.authenticate({
        email: this.email,
        password: this.password,
        type: 'local'
      }).then(function(result){
        const token = app.get('token');
        vm.$set('jwt', token);
        vm.fetchDocs();
        vm.$set('docList', true);
        vm.$set('logsign',false);
      }).catch(function(error){
        console.error('Error authenticating!', error);
      });

    },
    onFileChange: function onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.doUpload(files[0]);
    },
    doUpload: function (file) {
      var reader = new FileReader();
 
      reader.onload = function (e) {
        uploadService
        .create({uri: e.target.result})
        .then(function(response){
                // success
                console.log('Server responded with: ', response);
                vm.createDocument(response.id); 
            });       
      };
      reader.readAsDataURL(file);
    }    
  }
})

// Helper function for converting dataurl to blob, so it can be saved using FileSaver.js
//(from: http://stackoverflow.com/questions/6850276/how-to-convert-dataurl-to-file-object-in-javascript)
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

