import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { addReview } from "../../services/reviewService";

function Review() {

    const navigate = useNavigate();

    const { state } = useLocation();

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const submit = async () => {

        await addReview({

            patient:{
                id:state.patientId
            },

            doctor:{
                id:state.doctorId
            },

            rating,

            comment

        });

        alert("⭐ Review Submitted");

        navigate("/appointment-history");

    };

    return (

<div style={{padding:40}}>

<h1>Doctor Review</h1>

<h2>⭐⭐⭐⭐⭐ Rate Doctor</h2>

<select
value={rating}
onChange={(e)=>setRating(Number(e.target.value))}
>

<option value={5}>5 ⭐</option>
<option value={4}>4 ⭐</option>
<option value={3}>3 ⭐</option>
<option value={2}>2 ⭐</option>
<option value={1}>1 ⭐</option>

</select>

<br/><br/>

<textarea

rows={5}

style={{width:"100%"}}

placeholder="Write Review"

value={comment}

onChange={(e)=>setComment(e.target.value)}

/>

<br/><br/>

<button onClick={submit}>

Submit Review

</button>

</div>

    );

}

export default Review;