<template id="doclist-template">
  <div class="doclist-grp" v-if="$parent.docList">
    <table class="table table-striped">
      <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Author</th>
          <th>Text</th>
      </tr>
      <tr v-for="document in $parent.documents" is="document" :document="document"></tr>
      <p>
        <h2>Here's a list of all your documents.</h2>
         <label for="file">Add a document</label>
        <input type="file" name="file" @change="$parent.onFileChange">
      </p>
    </table>
  </div>   
</template>

<script>
  import Document from '../components/Document.vue'
  export default{
    components: {
      Document
    }
  }
</script>
