<template>
  <tr>
    <td>
        {{document.id}}
    </td>
    <td class="col-md-6">
        <input v-if="document.editing" v-model="document.title" class="form-control">
        </input>
             <span v-else>
                {{document.title}}
            </span>
    </td>
    <td>
        <input v-if="document.editing" v-model="document.author" class="form-control">
        </input>
             <span v-else>
                {{document.author}}
            </span>
    </td>
    <td>
        <input v-if="document.editing" v-model="document.text" class="form-control">
        </input>
            <span v-else>
                {{document.text}}
            </span>
    </td>
    <td>   
      <div class="btn-group" v-if="!document.editing">
          <button @click="editDocument(document)" class="btn btn-default">Edit</button>
          <button @click="deleteDocument(document)" class="btn btn-danger">Delete</button>
          <button @click="downloadDocument(document)" class="btn btn-default">Download</button>
      </div>
      <div class="btn-group" v-else>
          <button v-if="document.id" class="btn btn-primary" @click="updateDocument(document)">Update Document
          </button>
          <button v-else class="btn btn-success" @click="storeDocument(document)">Save New Document</button>
          <button @click="document.editing=false" class="btn btn-default">Cancel</button>
      </div>
    </td>
  </tr>
</template>

<script>
  import Vue from 'vue'
  import { dataURLtoBlob } from '../lib/helpers.js'
  import FileSaver from 'file-saver'
  export default {
    props: ['document'],
    methods: {
        deleteDocument: function (document) {
            this.$root.documents.$remove(document);
            this.$root.documentsService.remove(document.id, {});
            this.$root.uploadService.remove(document.fileName);
        },
        editDocument: function (document) {
          document.editing = true;
        },
        updateDocument: function (document) {
            this.$root.documentsService.patch(document.id, document, {});
            //Set editing to false to show actions again and hide the inputs
            document.editing = false;
        },
        storeDocument: function (document) {
          self = this
            self.$root.documentsService.create(document, {}).then(function (response) {
              Vue.set(document, 'id', response.id);
              document.editing = false;
            })
        },
        downloadDocument: function(document) {
          this.$root.uploadService.get(document.fileName).then(function(fileObject) {
            const blob = dataURLtoBlob(fileObject.uri);
            FileSaver.saveAs(blob, fileObject.id);
          })
        }
    }
  }
</script>

