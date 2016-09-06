import Vue from 'vue'
import Topnav from '../components/Topnav.vue'
import Login from '../components/Login.vue'
import Signup from '../components/Signup.vue'
import Doclist from '../components/Doclist.vue'
import feathers from 'feathers/client'
import hooks from 'feathers-hooks'
import authentication from 'feathers-authentication/client'
import socketio from 'feathers-socketio/client'
import io from 'socket.io-client'

// Establish a Socket.io connection
const socket = io()

// Set up Feathers client side
const app = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({ storage: window.localStorage }));

const documentsService = app.service('/documents');
const usersService= app.service('/users');
const uploadService = app.service('uploads');

const vm = new Vue({
  el: '#v-app',
  data: {
    logsign: false,
    login: false,
    signup: false,
    docList: false,
    documents: [],
    email: "",
    password: "",
    jwt: "",
    documentsService: documentsService,
    uploadService: uploadService,
    usersService: usersService
  },
  components: {
    Topnav,
    Login,
    Signup,
    Doclist
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
      self = this;

      documentsService.find().then(function(result) {
        if (result.data) {
            var documentsReady = result.data.map(function (document) {
              document.editing = false;
              return document;
          })
            // set data on vm
            self.$set('documents', documentsReady);            
          }
      }).catch(function(error) {
        console.log('Error finding messages', error);
      });

    },
    doLogin: function(){
      this.login = false;
      self = this;
      app.authenticate({
        email: this.email,
        password: this.password,
        type: 'local'
      }).then(function(result){
        const token = app.get('token');
        self.$set('jwt', token);
        self.fetchDocs();
        self.$set('docList', true);
        self.$set('logsign',false);
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
      self = this;
 
      reader.onload = function (e) {
        uploadService
        .create({uri: e.target.result})
        .then(function(response){
                // success
                console.log('Server responded with: ', response);
                self.createDocument(response.id); 
            });       
      };
      reader.readAsDataURL(file);
    }    
  }
})


