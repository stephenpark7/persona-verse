// import { useUserState } from '@hooks';
import { FC } from 'react';

export const Profile: FC = () => {
  // const { jwt, isLoggedIn } = useUserState();

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
      <div className="flex flex-col items-center justify-center mt-4">
        <img
          src="https://placehold.co/128x128"
          alt="Profile"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-xl font-semibold text-gray-900 mt-2">@username</h2>
        <p className="text-lg text-gray-500 mt-1">Short description</p>
      </div>
    </div>
  );
};
