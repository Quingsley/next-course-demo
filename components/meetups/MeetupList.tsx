import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";
interface MeetupData {
  id: string;
  title: string;
  image: string;
  address: string;
  description: string;
}

function MeetupList(props: { meetups: MeetupData[] }) {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
