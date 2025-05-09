'use client';

import React from 'react';
import { FaSchool, FaShieldAlt, FaHospital, FaStore, FaHome } from 'react-icons/fa';
import { MdDirectionsBus } from 'react-icons/md';
import { useTranslations } from 'next-intl';

// Define interfaces for neighborhood data
export interface CategoryData {
  score: number;
  description: string;
  details: string[];
}

export interface NeighborhoodData {
  schoolQuality: CategoryData;
  safety: CategoryData;
  healthcare: CategoryData;
  amenities: CategoryData;
  housing: CategoryData;
  transportation: CategoryData;
  [key: string]: CategoryData; // Index signature for dynamic access
}

interface NeighborhoodAnalysisProps {
  insightsData: NeighborhoodData | null;
  loadingInsights: boolean;
  opportunityScore: number | null;
  loadingOpportunityScore?: boolean;
}

const NeighborhoodAnalysis: React.FC<NeighborhoodAnalysisProps> = ({ 
  insightsData, 
  loadingInsights, 
  opportunityScore, 
  loadingOpportunityScore = false 
}) => {
  const t = useTranslations('neighborhoodAnalysis');
  
  // No longer tracking user ratings as this feature is being removed
  
  // Define the categories for neighborhood insights
  const categories = [
    { id: 'schoolQuality', name: t('schoolQuality'), icon: <FaSchool size={20} /> },
    { id: 'safety', name: t('safety'), icon: <FaShieldAlt size={20} /> },
    { id: 'healthcare', name: t('healthcare'), icon: <FaHospital size={20} /> },
    { id: 'amenities', name: t('amenities'), icon: <FaStore size={20} /> },
    { id: 'housing', name: t('housing'), icon: <FaHome size={20} /> },
    { id: 'transportation', name: t('transportation'), icon: <MdDirectionsBus size={20} /> }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4">{t('title')}</h3>
      
      {(!insightsData && opportunityScore === null) ? (
        <div className="flex justify-center items-center flex-grow">
          <p className="text-gray-500">{t('enterAddress')}</p>
        </div>
      ) : (
        <div className="flex-grow flex flex-col">
          {/* Opportunity Score */}
          <div className="mb-8 border-b border-gray-200 pb-6">
            <h4 className="text-lg font-semibold mb-4">{t('opportunityScore')}</h4>
            <div className="flex items-center">
              {loadingOpportunityScore ? (
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="relative flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-200 z-10">
                      <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">
                      {t('loadingScore')}
                    </p>
                  </div>
                </div>
              ) : opportunityScore !== null ? (
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="absolute w-24 h-24 bg-primary bg-opacity-10 rounded-full animate-pulse"></div>
                    <div className="relative flex flex-col items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg border-4 border-primary z-10">
                      <span 
                        className="text-2xl font-bold" 
                        style={{ color: '#6CD9CA' }}
                      >
                        {Math.round(opportunityScore)}/10
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">
                      {t('scoreDescription')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="relative mr-4">
                    <div className="relative flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-200 z-10">
                      <span className="text-2xl font-bold text-gray-300">--</span>
                    </div>
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm text-gray-600">
                      {t('enterAddress')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Neighborhood Insights Bar Graph */}
          {loadingInsights ? (
            <div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">{t('neighborhoodFactors')}</h4>

              </div>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-sm text-gray-500">{t('loadingInsights')}</p>
              </div>
            </div>
          ) : insightsData ? (
            <div>
              <div className="mb-4">
                <h4 className="text-lg font-semibold">{t('neighborhoodFactors')}</h4>

              </div>
              <div>
                {categories.map((category) => {
                  const score = insightsData[category.id].score;
                  const filledIcons = Math.round(score);
                  
                  return (
                    <div key={category.id} className="mb-5">
                      <div className="flex items-center mb-1">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="ml-auto text-sm font-semibold">
                          <span>{Math.round(score)}/10</span>
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(10)].map((_, index) => {
                          // Determine if this icon should be filled based on the data score
                          const isFilledByScore = index < filledIcons;
                          
                          return (
                            <div 
                              key={index} 
                              className={`
                                ${isFilledByScore ? 'text-primary' : 'text-gray-200'}
                                ${index === 0 ? 'relative' : ''}
                              `}

                              title={`${category.name} - Level ${index + 1}`}
                            >
                              {category.icon}

                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : null}
          
          {/* No additional information section */}
        </div>
      )}
    </div>
  );
};

export default NeighborhoodAnalysis;
