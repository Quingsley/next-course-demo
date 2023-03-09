import Image from "next/image";
import classes from "./MeetupDetail.module.css";

const MeetUpDetail = (props: {
  image: string;
  title: string;
  description: string;
}) => {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title} srcSet={props.image} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </section>
  );
};

export default MeetUpDetail;
