import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import FormInput from '@/components/forms/FormInput';
import { MdPerson } from 'react-icons/md';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ProfileFormInputs = z.infer<typeof profileSchema>;
type PasswordFormInputs = z.infer<typeof passwordSchema>;

/**
 * Profile Page Component
 * User profile management with edit and password change
 */
const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const profileForm = useForm<ProfileFormInputs>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.email?.split('@')[0] || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<PasswordFormInputs>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onProfileSubmit = (data: ProfileFormInputs) => {
    console.log('Profile update:', data);
    toast.success('Profile updated successfully');
    setIsEditingProfile(false);
  };

  const onPasswordSubmit = (data: PasswordFormInputs) => {
    console.log('Password change:', data);
    toast.success('Password changed successfully');
    passwordForm.reset();
  };

  return (
    <div className="mt-2 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Profile Settings</h1>
        <p className="text-sm text-gray-600 mt-2 leading-relaxed">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-4xl text-indigo-600 mb-4">
                <MdPerson />
              </div>
              <h2 className="text-lg font-semibold text-gray-900">{user?.email?.split('@')[0] || 'User Name'}</h2>
              <p className="text-sm text-gray-600 mt-1">{user?.email || 'user@example.com'}</p>
              <div className="mt-4 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                Admin
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium text-gray-900">Jan 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last login</span>
                  <span className="font-medium text-gray-900">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Edit and Password Change */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
                <p className="text-sm text-gray-600 mt-1">Update your account information</p>
              </div>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-colors"
              >
                {isEditingProfile ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <FormInput
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                form={profileForm}
              />

              <FormInput
                label="Email Address"
                name="email"
                type="email"
                placeholder="Enter your email"
                form={profileForm}
              />

              {isEditingProfile && (
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
              <p className="text-sm text-gray-600 mt-1">Update your password to keep your account secure</p>
            </div>

            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <FormInput
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter current password"
                form={passwordForm}
              />

              <FormInput
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                form={passwordForm}
              />

              <FormInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                form={passwordForm}
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
