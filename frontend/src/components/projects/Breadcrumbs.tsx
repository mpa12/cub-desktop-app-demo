import React from "react";
import cn from "classnames";
import {Link} from "react-router-dom";

const fileClassName = cn('flex items-center flex-col rounded cursor-pointer',
  'p-[5px] hover:bg-gray-hover self-start max-w-[100px] gap-[2px]');

const Breadcrumbs = ({ projectName, folderName, onProjectClick }) => {
  return (
    <div>
      <Link style={{ textDecoration: "underline", cursor: "pointer" }} to="/projects">Проекты</Link>
      <span> / </span>
      {folderName ? (
        <>
          <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={onProjectClick}>
            {projectName}
          </span>
          <span> / </span>
          <span>{folderName}</span>
        </>
      ) : (
        <span>{projectName}</span>
      )}
    </div>
  );
};

export default Breadcrumbs;
