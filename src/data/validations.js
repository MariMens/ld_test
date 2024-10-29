import moment from 'moment';

const today = moment();

export const calculateAge = (birthday) => {
    return today.diff(birthday, 'years');
};

export const isValidDate = (value) => {
  if (value) {
      return moment(value).isSameOrBefore(today);
  }
  return false;
};

export const validateAgeUnder18 = (value) => {
    if (value) {
        const birthday = moment(value);
        const age = calculateAge(birthday);

        return (age < 18) ||
            (age === 18 && (today.month() < birthday.month() ||
                (today.month() === birthday.month() && today.date() < birthday.date())));
    }
    return false;
};

export const validateAgeOver18 = (value) => {
    if (value) {
        const birthday = moment(value);
        const age = calculateAge(birthday);

        return (age > 18) ||
            (age === 18 && (today.month() > birthday.month() ||
                (today.month() === birthday.month() && today.date() > birthday.date())));
    }
    return false;
};