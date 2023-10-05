import { BuildingOffice2Icon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';

const MobileNavbar = ({ hideSidebar }) => (
  <button
    type="button"
    onClick={hideSidebar}
    className="mt-3 w-max mx-auto flex justify-center"
  >
    <BuildingOffice2Icon className="cursor-pointer w-20 text-white p-3" />
  </button>
);

MobileNavbar.propTypes = {
  hideSidebar: PropTypes.func.isRequired,
};

export default MobileNavbar;
