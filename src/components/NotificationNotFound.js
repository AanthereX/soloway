import React from "react";

export const NotificationNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col gap-y-2 items-center justify-center">
      <img
        src="/images/notificationnotfound.png"
        alt="nonotificationicon"
        className="h-16 w-16"
      />
      <p className="text-base font-normal text-c_fff">
        <span className="text-c_BF642B text-xl font-medium">{`"Notifications" `}</span>
        {`Not Found`}
      </p>
    </div>
  );
};
