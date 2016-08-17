/**
 * Starts a countdown to a given endTime. The remaining time will be calculated
 * once a second. Labels will be updated to use the correct singular /
 * plural. One digit numbers will be left padded with a zero.
 *
 * @param endTime time when the countdown should end
 * @param days element to display the remaining days
 * @param hours element to display the remaining hours
 * @param minutes element to display the remaining minutes
 * @param seconds element to display the remaining seconds
 * @param daysLabel element to display the label for the remaining days
 * @param hoursLabel element to display the label for the remaining hours
 * @param minutesLabel element to display the label for the remaining minutes
 * @param secondsLabel element to display the label for the remaining seconds
 * @param doneCallback function to call when the countdown ended
 */
function countdown(endTime, days, hours, minutes, seconds, daysLabel, hoursLabel, minutesLabel, secondsLabel, doneCallback) {
    var cdTimer = setInterval(calculateRemaining, 1000);

    /**
     * calculateRemaining calculates the remaining time to the end date. If the
     * time delta is zero or less stop the timer.
     */
    function calculateRemaining() {
        var now = new Date();
        var delta = (endTime - now) / 1000;

        if (delta < 1) {
            stopTimer();
            return;
        }

        var secondsDay = 24 * 60 * 60;
        var secondsHour = 60 * 60;
        var secondsMinute = 60;

        var daysRemaining = Math.floor(delta / secondsDay);
        var hoursRemaining = Math.floor((delta % secondsDay) / secondsHour);
        var minutesRemaining = Math.floor((delta % secondsHour) / secondsMinute);
        var secondsRemaining = Math.floor(delta % secondsMinute);

        updateTime(daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining);
    }

    /**
     * stopTimer stops the timer, updates all labels to 0 and calls the callback.
     */
    function stopTimer() {
        clearInterval(cdTimer);
        updateTime(0,0,0,0);
        doneCallback();
    }

    /**
     * updateTime updates the time labels. For hours, minutes and seconds padZero
     * is used to make sure we have a leading zero for single digit values.
     *
     * @param daysRemaining remaining days to end date
     * @param hoursRemaining remaining hours to end date
     * @param minutesRemaining remaining minutes to end date
     * @param secondsRemaining remaining seconds to end date
     */
    function updateTime(daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining) {
        days.text(daysRemaining);
        hours.text(padZero(hoursRemaining));
        minutes.text(padZero(minutesRemaining));
        seconds.text(padZero(secondsRemaining));
        updateLabels(daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining);
    }

    /**
     * updateLabels updates the labels to use the proper singular / plural.
     *
     * @param daysRemaining remaining days to end date
     * @param hoursRemaining remaining hours to end date
     * @param minutesRemaining remaining minutes to end date
     * @param secondsRemaining remaining seconds to end date
     */
    function updateLabels(daysRemaining, hoursRemaining, minutesRemaining, secondsRemaining) {
        if (daysRemaining == 1) {
            daysLabel.text("day");
        } else {
            daysLabel.text("days");
        }

        if (hoursRemaining == 1) {
            hoursLabel.text("hour");
        } else {
            hoursLabel.text("hours");
        }

        if (minutesRemaining == 1) {
            minutesLabel.text("minute");
        } else {
            minutesLabel.text("minutes");
        }

        if (secondsRemaining == 1) {
            secondsLabel.text("second");
        } else {
            secondsLabel.text("seconds");
        }
    }

    /**
     * padZero returns the number with a leading zero if the number is smaller
     * than 10. padZero returns a string - should only be used for displaying
     * a number.
     *
     * @param number number to pad
     * @returns string with number, padded if necessary
     */
    function padZero(number) {
        if (number < 10) {
            return "0" + number;
        }
        return number;
    }
}
