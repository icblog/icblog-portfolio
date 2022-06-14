<footer>
  <p>@copyright 2022</p>
</footer>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"
    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
   <script>
    //AJAX TOKEN SETTINGS
     $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
     });
     //ROUTE NAMES
     let routes = {
          'contactIndex': '{{ route('contact.index') }}'
         
         
       };
     
   </script>
 <script src="{{ asset('js/image-uploader.min.js?v='.rand(1,99)) }}"></script>
 <script src="{{ asset('js/jsRapStar.js?v='.rand(1,99)) }}"></script>
   <script src="{{ asset('js/app.js?v='.rand(1,99)) }}"></script>

</body>
</html>

