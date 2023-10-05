import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Chip,
} from '@material-tailwind/react';
import { BookmarkIcon, BookmarkSlashIcon } from '@heroicons/react/24/solid';
import { TagIcon, NoSymbolIcon } from '@heroicons/react/24/outline';
import moment from 'moment';

const ReservationDetail = ({
  reservationTitle,
  checkinDate,
  checkoutDate,
  hotel,
  roomAvailable,
}) => {
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  const formatDate = (date) => moment(date).format('ddd, MMM Do, YYYY');
  return (
    <>
      <Accordion open={open === 1} animate={customAnimation}>
        <AccordionHeader onClick={() => handleOpen(1)}>
          {reservationTitle}
        </AccordionHeader>
        {!roomAvailable && (
          <Chip
            color="red"
            value="Room is no longer available"
            icon={<NoSymbolIcon />}
            className="capitalize mt-2"
          />
        )}
        <AccordionBody>
          <ul className="list-outside list-disc">
            <li className="flex gap-1 items-center">
              <TagIcon className="w-7 stroke-amber-600" />
              <span>{hotel}</span>
            </li>
            <li className="flex gap-1 items-center">
              <BookmarkIcon className="w-7 fill-blue-gray-600" />
              <span>{formatDate(checkinDate)}</span>
            </li>
            <li className="flex gap-1 items-center">
              <BookmarkSlashIcon className="w-7 fill-red-500" />
              <span>{formatDate(checkoutDate)}</span>
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </>
  );
};

ReservationDetail.propTypes = {
  reservationTitle: PropTypes.string.isRequired,
  hotel: PropTypes.string.isRequired,
  checkinDate: PropTypes.string.isRequired,
  checkoutDate: PropTypes.string.isRequired,
  roomAvailable: PropTypes.bool.isRequired,
};

export default ReservationDetail;
