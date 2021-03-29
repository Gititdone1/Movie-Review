import React from 'react';
import ReviewList from './Components/reviewList';
import Comments from './Components/createComments';

function App() {
  return (
    <div className="App">
    
    <h2 className="title">Review Movie: Rate and give feedback!!</h2>

    <ReviewList 
    body="Read Reviews" 
    imageUrl= "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR1,0,182,268_AL_.jpg"
    thoughts=""
    movieName = "Forrest Gump"
    />
    </div>
  );
}

export default App;