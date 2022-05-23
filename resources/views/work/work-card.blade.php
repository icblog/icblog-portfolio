<div class="row">
      <div class="masonry">
       @foreach ($workData as $work)
       <div class="item">
        <img src="{{$work->imgUrl}}" data-dir1="{{$work->imgUrl}}" class="work-img"/>
       </div>
       @endforeach
     </div>
   </div>