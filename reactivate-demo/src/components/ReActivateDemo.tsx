import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Target, 
  Calendar, 
  User, 
  Zap, 
  Heart, 
  TrendingUp, 
  Clock, 
  Award, 
  CheckCircle,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Users,
  BarChart3,
  Smartphone,
  Brain,
  Shield
} from 'lucide-react';

const ReActivateDemo = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [painAreas, setPainAreas] = useState([]);
  const [trainingIntensity, setTrainingIntensity] = useState(7);
  const [availableEquipment, setAvailableEquipment] = useState([]);
  const [recoveryPlan, setRecoveryPlan] = useState(null);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [isExercising, setIsExercising] = useState(false);
  const [timer, setTimer] = useState(0);

  // Mock data
  const equipment = ['Foam Roller', 'Resistance Bands', 'Massage Ball', 'Ice Bath', 'Heating Pad', 'Yoga Mat'];
  const bodyAreas = ['Legs', 'Back', 'Shoulders', 'Arms', 'Core', 'Neck'];
  
  const mockRecoveryPlans = {
    light: {
      title: "Active Recovery",
      duration: "20 minutes",
      exercises: [
        { name: "Light Walking", duration: "5 min", description: "Gentle movement to promote blood flow" },
        { name: "Dynamic Stretching", duration: "10 min", description: "Full body mobility sequence" },
        { name: "Breathing Exercises", duration: "5 min", description: "Deep breathing for relaxation" }
      ]
    },
    moderate: {
      title: "Targeted Recovery",
      duration: "35 minutes",
      exercises: [
        { name: "Foam Rolling", duration: "10 min", description: "Focus on tight muscle groups" },
        { name: "Mobility Sequence", duration: "15 min", description: "Joint mobility and flexibility" },
        { name: "Recovery Stretches", duration: "10 min", description: "Static stretches for problem areas" }
      ]
    },
    intense: {
      title: "Deep Recovery Protocol",
      duration: "45 minutes",
      exercises: [
        { name: "Contrast Therapy", duration: "15 min", description: "Alternating hot/cold treatment" },
        { name: "Myofascial Release", duration: "15 min", description: "Deep tissue work with tools" },
        { name: "Restorative Yoga", duration: "15 min", description: "Gentle poses for recovery" }
      ]
    }
  };

  useEffect(() => {
    let interval;
    if (isExercising) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExercising]);

  const generateRecoveryPlan = () => {
    const intensity = trainingIntensity >= 8 ? 'intense' : trainingIntensity >= 5 ? 'moderate' : 'light';
    const plan = mockRecoveryPlans[intensity];
    
    // Customize based on pain areas and equipment
    const customizedPlan = {
      ...plan,
      painFocus: painAreas.length > 0 ? painAreas : ['General Recovery'],
      equipment: availableEquipment.length > 0 ? availableEquipment : ['Bodyweight'],
      aiInsight: `Based on your training intensity (${trainingIntensity}/10) and reported pain in ${painAreas.join(', ') || 'general areas'}, this plan focuses on targeted recovery.`
    };
    
    setRecoveryPlan(customizedPlan);
    setCurrentView('dashboard');
  };

  const startExercise = () => {
    setIsExercising(true);
    setTimer(0);
  };

  const pauseExercise = () => {
    setIsExercising(false);
  };

  const completeExercise = () => {
    setIsExercising(false);
    setTimer(0);
    if (currentExercise < recoveryPlan.exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    } else {
      setCompletedSessions(prev => prev + 1);
      setCurrentExercise(0);
      setCurrentView('completion');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-yellow-400" />
            <span className="text-2xl font-bold">ReActivate</span>
          </div>
          <button 
            onClick={() => setCurrentView('onboarding')}
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-300 transition-colors"
          >
            Get Started Free
          </button>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Recover Like a Pro
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-300">
            AI-powered recovery plans tailored to your training, pain points, and available equipment. 
            Join thousands of athletes optimizing their recovery.
          </p>
          <div className="flex justify-center space-x-4 mb-16">
            <button 
              onClick={() => setCurrentView('onboarding')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Start Your Recovery Journey
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition-all">
              Watch Demo
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <Brain className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Plans</h3>
              <p className="text-gray-300">Personalized recovery protocols based on your data</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <Smartphone className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Mobile-First</h3>
              <p className="text-gray-300">Train anywhere with guided video sessions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Injury Prevention</h3>
              <p className="text-gray-300">Science-backed protocols to keep you healthy</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/5 backdrop-blur-lg py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-yellow-400">25K+</div>
                <div className="text-gray-300">Active Athletes</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-400">89%</div>
                <div className="text-gray-300">Injury Reduction</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400">$15</div>
                <div className="text-gray-300">Per Month</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-400">4.9★</div>
                <div className="text-gray-300">App Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Onboarding
  if (currentView === 'onboarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Let's Personalize Your Recovery</h1>
            <p className="text-gray-600">Tell us about your training and any areas of concern</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Pain Areas */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Any pain or soreness? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {bodyAreas.map(area => (
                  <button
                    key={area}
                    onClick={() => setPainAreas(prev => 
                      prev.includes(area) ? prev.filter(p => p !== area) : [...prev, area]
                    )}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      painAreas.includes(area) 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            {/* Training Intensity */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Today's Training Intensity (1-10)
              </label>
              <div className="space-y-2">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={trainingIntensity}
                  onChange={(e) => setTrainingIntensity(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Light</span>
                  <span className="font-semibold text-blue-600">{trainingIntensity}</span>
                  <span>Intense</span>
                </div>
              </div>
            </div>

            {/* Available Equipment */}
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-4">
                Available Equipment (Select all you have)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {equipment.map(item => (
                  <button
                    key={item}
                    onClick={() => setAvailableEquipment(prev => 
                      prev.includes(item) ? prev.filter(e => e !== item) : [...prev, item]
                    )}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      availableEquipment.includes(item) 
                        ? 'border-green-500 bg-green-50 text-green-700' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={generateRecoveryPlan}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
            >
              Generate My Recovery Plan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">ReActivate</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Award className="h-4 w-4" />
                <span>{completedSessions} sessions completed</span>
              </div>
              <User className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* AI Insight Card */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Brain className="h-8 w-8 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">AI Recovery Insight</h3>
                <p className="text-blue-100">{recoveryPlan?.aiInsight}</p>
              </div>
            </div>
          </div>

          {/* Today's Plan */}
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{recoveryPlan?.title}</h2>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5" />
                    <span>{recoveryPlan?.duration}</span>
                  </div>
                </div>

                {/* Exercise List */}
                <div className="space-y-4">
                  {recoveryPlan?.exercises.map((exercise, idx) => (
                    <div 
                      key={idx}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        idx === currentExercise 
                          ? 'border-blue-500 bg-blue-50' 
                          : idx < currentExercise 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {idx < currentExercise ? (
                              <CheckCircle className="h-6 w-6 text-green-500" />
                            ) : idx === currentExercise ? (
                              <div className="h-6 w-6 rounded-full border-2 border-blue-500 bg-blue-500" />
                            ) : (
                              <div className="h-6 w-6 rounded-full border-2 border-gray-300" />
                            )}
                            <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
                            <span className="text-sm text-gray-500">{exercise.duration}</span>
                          </div>
                          <p className="text-gray-600 ml-9">{exercise.description}</p>
                        </div>
                        {idx === currentExercise && (
                          <div className="flex items-center space-x-2">
                            {!isExercising ? (
                              <button 
                                onClick={startExercise}
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600"
                              >
                                <Play className="h-4 w-4" />
                                <span>Start</span>
                              </button>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-lg">{formatTime(timer)}</span>
                                <button 
                                  onClick={pauseExercise}
                                  className="bg-orange-500 text-white px-3 py-2 rounded-lg hover:bg-orange-600"
                                >
                                  <Pause className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={completeExercise}
                                  className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Stats Card */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sessions This Week</span>
                    <span className="font-semibold">{completedSessions}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Streak</span>
                    <span className="font-semibold">5 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pain Reduction</span>
                    <span className="font-semibold text-green-600">-23%</span>
                  </div>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {recoveryPlan?.painFocus.map(area => (
                    <span key={area} className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Using Today</h3>
                <div className="flex flex-wrap gap-2">
                  {recoveryPlan?.equipment.map(item => (
                    <span key={item} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Completion Screen
  if (currentView === 'completion') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-6">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Session Complete!</h2>
              <p className="text-gray-600">Great job on completing your recovery session</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-gray-800">Duration</div>
                  <div className="text-gray-600">{recoveryPlan?.duration}</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">Exercises</div>
                  <div className="text-gray-600">{recoveryPlan?.exercises.length}</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  setCurrentExercise(0);
                  setCurrentView('dashboard');
                }}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Plan Tomorrow's Recovery
              </button>
              <button 
                onClick={() => setCurrentView('onboarding')}
                className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                New Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ReActivateDemo;