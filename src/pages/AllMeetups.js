import { useState, useEffect } from 'react';

import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      'https://academind-react-basics-default-rtdb.firebaseio.com/meetups.json'
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const meetups = [];

        for (const key in data) {
          const meetup = {
            id: key,
            ...data[key]
          };

          meetups.push(meetup);
        }

        setIsLoading(false);
        setLoadedMeetups(meetups);
      });
  }, []);

  let content
  if (isLoading) {
    content = <p>Loading...</p>
  }
  else if (!loadedMeetups.length) {
    content = <p>You got no meetups yet.</p>
  }
  else {
    content = <MeetupList meetups={loadedMeetups} />
  }

  return (
    <section>
      <h1>All Meetups</h1>
      {content}
    </section>
  );
}

export default AllMeetupsPage;
