'use client';

import useGetPerson from '@/store/queries/useGetPerson';
import { BsLinkedin } from 'react-icons/bs';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import Link from 'next/link';

interface PersonPageProps {
  params: { person: string };
}

export default function PersonPage({ params }: PersonPageProps) {
  const { data, isLoading, isError } = useGetPerson(params.person);
  const person = data?.data;

  if (isLoading)
    return (
      <div className="p-6 text-gray-400 flex items-center justify-center min-h-screen bg-gray-900">
        Loading...
      </div>
    );
  if (isError || !person)
    return <div className="p-6 text-red-500">Failed to load person.</div>;

  return (
    <div className="dashboard-padder text-white">
      <div className=" rounded-xl shadow-xl p-6 space-y-6 lg:w-[1/2]">
        <h1 className="text-3xl font-bold text-blue-400 capitalize">
          {person.firstName} {person.lastName}
        </h1>

        <div className="space-y-2">
          <p className="text-lg text-gray-300 capitalize">{person.jobTitle}</p>
          <p className="text-md text-gray-400 capitalize">
            {person.businessName}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
          <div className="flex items-start gap-2">
            <MdLocationOn className="text-blue-500 mt-1" />
            <p className="text-gray-300">
              {person.address}, {person.city}, {person.province}{' '}
              {person.postalCode}, {person.country}
            </p>
          </div>

          {person.phoneNumbers && person.phoneNumbers?.length > 0 && (
            <div className="flex items-start gap-2">
              <FaPhone className="text-green-500 mt-1" />
              <div className="text-gray-300 space-y-1">
                {person.phoneNumbers.map((phone: any, idx: number) => (
                  <p key={idx}>{phone}</p>
                ))}
              </div>
            </div>
          )}

          {person.primaryEmail && (
            <div className="flex items-start gap-2">
              <FaEnvelope className="text-yellow-400 mt-1" />
              <div className="text-gray-300 space-y-1">
                <p>{person.primaryEmail}</p>
              </div>
            </div>
          )}

          {person.professionalEmails.length > 0 && (
            <div className="flex items-start gap-2">
              <FaEnvelope className="text-yellow-400 mt-1" />
              <div className="text-gray-300 space-y-1">
                {person.professionalEmails.map((email: any, idx: number) => (
                  <p key={idx}>{email}</p>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4 flex-wrap">
          {person.linkedinURL && (
            <Link
              href={person.linkedinURL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-500 hover:underline"
            >
              <BsLinkedin /> LinkedIn
            </Link>
          )}
        </div>

        {person.businessCategories.length > 0 && (
          <div className="mt-8">
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-2">
              Business Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {person.businessCategories.map((cat: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
