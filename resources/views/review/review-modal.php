<!-- The Modal -->
<div class="modal" id="reviewModal" data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="no-border-radius modal-content">

      <!-- Modal Header -->
      <div class="modal-header">
        <h5 class="modal-title text-center">Review us</h5>
        <button type="button" id="auth-modal-close-btn" class="auth-modal-close-btn close">&times;</button>
      </div>

      <!-- Modal body -->
      <div class="modal-body">
        <div class="form-wrapper">

    <p class="form-top-text">Leave your review below.</p>
    <div class="err-div"></div>
   <form id="review-form" method="POST">
    <label for="star">Your star:</label>
    <div id="review-stars" value="3"></div>
   <div class="mt-3 form-group">
     <label class="form-label" for="comment">Your comment:</label>
      <textarea name="comment" id="comment" class="form-control" maxlength="6000"></textarea> 
    </div>
     <input type="hidden" value="" name="reviewId" id="reviewId">
    <input type="hidden" value="" name="star" id="user-star">
    <input type="hidden" value="" name="action" id="review-action">

    <div class="pt-3 text-center">
       <button id="review-form-btn" type="submit" class="primary-btn">Submit</button>
     </div>
   </form>
 </div>
      </div>
   </div>
  </div>
</div>

