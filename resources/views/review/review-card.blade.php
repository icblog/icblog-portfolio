
    <div class="mt-4 row">
      <div class="review-item-wrapper masonry">
       @foreach ($reviewData as $review)
        <div class="review-item item box-shadow">
        <div class="mb-1">
          <div class="admin-review-stars" value="{{$review->star}}"></div>
        </div>
        <div>
        <span class="font-weight-bold">Date:</span>
        <span>
          
          {{$review->created_at}}
          {{$review->parent_id}}
        </span>
      </div>
      

      <div>
        <span class="font-weight-bold">By:</span>
        <span>
          {{$review->first_name}}
        </span>
      </div>
        <div class="mb-1">
        <span class="font-weight-bold">Comment:</span> 
          {{$review->comment}}
        
       </div>
      <hr/>
       @foreach ($review->replies as $reply)
       <div class="mb-1">
        <span class="font-weight-bold">Adom Balloons:</span> {{$reply->comment}}
        
       </div>
         @endforeach
     </div>
     
    @endforeach
    </div>
   </div>