import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

function CalendarView({markedDates, selectedDate, onSelectDate}) {

    // const markedDates = {
    //     '2022-03-04': {
    //         selected: true,
    //     },
    //     '2022-03-05': {
    //         marked: true,
    //     },
    //     '2022-03-06': {
    //         marked: true,
    //     },
    // };

    const markedSelectedDate = {
        ...markedDates,
        [selectedDate]: {
            selected: true,
            marked: markedDates[selectedDate]?.marked,
        },
    };

    return (
        <Calendar
            style={styles.calendar}
            markedDates={markedSelectedDate}
            hideExtraDays={true}
            onDayPress={(day) => {
                //console.log(day);
                onSelectDate(day.dateString);
            }}
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
                disabledByDefault: true,
            }}
        />
    );
}

const styles = StyleSheet.create({
    calendar : {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default CalendarView;