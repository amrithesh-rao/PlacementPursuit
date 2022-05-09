import FeedbackLogo from '../img/preview.jpg';
const SearchBar = () => (
    <div><img className="feedback-img"
    src={FeedbackLogo}
    alt="First slide"
    height={350}/>

    <div>
      <form className='box'>
        <input type='text' className='search' placeholder='Search Feedback' required/>
        <button type='button' className='search-btn'>Search</button>
      </form>
    </div>
</div>
);

export default SearchBar;