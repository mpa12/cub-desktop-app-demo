import React from "react";
import Icon from "@ui/Icon";
import {Link} from "react-router-dom";
import ServicePan, {ServicePanProps} from "@components/services/ServicePan";

const Services = () => {
  const services: ServicePanProps[] = [
    { path: '/profile', title: 'Профиль', iconName: 'person' },
    { path: '/reports', title: 'Отчеты', iconName: 'fileEarmarkBarGraph' },
  ];

  return (
    <div className={'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'}>
      {services.map(service => {
        return <ServicePan
          key={`service-${service.title}`}
          path={service.path}
          title={service.title}
          iconName={service.iconName}
        />;
      })}
    </div>
  );
};

export default Services;
