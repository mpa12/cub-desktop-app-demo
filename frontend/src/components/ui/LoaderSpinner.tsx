import React from "react";
import {BeatLoader} from "react-spinners";

interface LoaderSpinnerProps {
  loading: boolean;
}

const LoaderSpinner = ({ loading }: LoaderSpinnerProps) => {
  return (
    <div className="sweet-loading">
      <BeatLoader
        size={15}
        margin={2}
        color={'#1c9a47'}
        loading={loading}
      />
    </div>
  );
};

export default LoaderSpinner;
