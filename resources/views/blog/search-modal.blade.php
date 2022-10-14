<!-- The Modal -->
<div class="modal" id="search-modal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="no-border-radius modal-content">
    <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title text-center">Search away!</h5>
        <button type="button" class="close close-search-modal" data-dismiss="modal">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="search-form-wrapper">
         <form id="main-search-form" method="POST">
          <div class="err-div-search-form"></div>
          <div class="form-group main-search-input-wrapper">
          <span class="main-search-icon"><i class="fas fa-search"></i></span>
           <input type="text" name="searchedword" id="main-search-input" class="main-search-input form-control" maxlength="255"/> 
         </div>
      </form>
     </div>

       <!-- Div for search results -->
       <!-- Js populate result with content -->
       <div id="main-search-result-wrapper" class="main-search-result-wrapper"></div>
 
 </div>
</div>
</div>
</div>

