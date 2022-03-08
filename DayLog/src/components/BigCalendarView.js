import React from 'react';
import { Calendar } from 'react-native-big-calendar'
import {StyleSheet} from 'react-native';
//import events from './event';

function BigCalendarView() {

    const events = [
    {
          title: 'Meeting',
          start: new Date(2022, 2, 8, 0, 0),
          end: new Date(2022, 2, 8, 2, 30),
        },
        {
          title: 'Coffee break',
          start: new Date(2022, 2, 11, 15, 45),
          end: new Date(2022, 2, 11, 16, 30),
        },
        {
          title: 'Long Event',
          start: new Date(2022, 2, 9, 0, 0, 0),
          end: new Date(2022, 2, 9, 0, 0, 0),
        },
    ]

    return (
        <Calendar
            style={styles.calendar}
            events={events}
            height={600}
            mode='month'
        />
    );
}

const styles = StyleSheet.create({
    calendar : {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default BigCalendarView;