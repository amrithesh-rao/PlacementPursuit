import FeedbackLogo from '../img/preview.jpg';
const SearchBar = () => (
    <div><img clasName="container"
    src={FeedbackLogo}
    alt="First slide"
    width={500} height={350}/>

<div class="container">
      <div id="content">
        <form class='form-inline'>
          <div class="input-group">
            <input type='text' id='search' class="form-control search-form" placeholder="Search Feedback"/>
            <span class="input-group-btn" width={200}>
              <button id="search-this"type="button" class="pull-right btn btn-default search-btn">
                  <i class="fa fa-search">Search</i>
              </button>
            </span>
          </div>
        </form>
    </div>
  </div>
</div>
);

export default SearchBar;