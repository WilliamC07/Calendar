import React, {useState} from 'react';

export default function NewEventViewerBox({}){
    const [expanded, setExpanded] = useState(false);
    const [eventInfo, setEventInfo] = useState({
        name: "",
    });

    const handleEventInfo = (e) => {
        setEventInfo({...eventInfo, [e.target.id]: e.target.value})
    };

    return (
        <div>

        </div>
    )
}