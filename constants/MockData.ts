export const mockTrips = [
    {
      id: "1",
      title: "Himalayan Adventure",
      startPoint: "Delhi",
      destination: "Leh",
      distance: "1200 km",
      duration: "7 days",
      budget: "₹25,000",
      bike: "Royal Enfield Himalayan",
      femaleOnly: false,
      image: "https://images.unsplash.com/photo-1570071677470-c04398af73fc",
      description: "Experience the breathtaking beauty of the Himalayas on this 7-day adventure.",
      route: [
        { latitude: 28.7041, longitude: 77.1025 }, // Delhi
        { latitude: 30.7333, longitude: 76.7794 }, // Chandigarh
        { latitude: 32.2432, longitude: 77.1892 }, // Manali
        { latitude: 32.7266, longitude: 76.9762 }, // Keylong
        { latitude: 33.9462, longitude: 76.8398 }, // Sarchu
        { latitude: 34.1526, longitude: 77.5771 }, // Leh
      ],
      members: [
        { id: "1", name: "Rahul", image: "https://randomuser.me/api/portraits/men/1.jpg" },
        { id: "2", name: "Priya", image: "https://randomuser.me/api/portraits/women/1.jpg" },
        { id: "3", name: "Amit", image: "https://randomuser.me/api/portraits/men/2.jpg" },
      ],
    },
    {
      id: "2",
      title: "Coastal Karnataka",
      startPoint: "Bangalore",
      destination: "Gokarna",
      distance: "500 km",
      duration: "3 days",
      budget: "₹12,000",
      bike: "KTM Duke 390",
      femaleOnly: false,
      image: "https://images.unsplash.com/photo-1584545284372-f22510eb7c26",
      description: "Ride along the beautiful coastal roads of Karnataka.",
      route: [
        { latitude: 12.9716, longitude: 77.5946 }, // Bangalore
        { latitude: 13.3409, longitude: 75.807 }, // Chikmagalur
        { latitude: 13.9299, longitude: 74.6305 }, // Udupi
        { latitude: 14.5421, longitude: 74.3217 }, // Gokarna
      ],
      members: [
        { id: "4", name: "Vikram", image: "https://randomuser.me/api/portraits/men/3.jpg" },
        { id: "5", name: "Neha", image: "https://randomuser.me/api/portraits/women/2.jpg" },
      ],
    },
    {
      id: "3",
      title: "Spiti Valley Expedition",
      startPoint: "Chandigarh",
      destination: "Kaza",
      distance: "650 km",
      duration: "5 days",
      budget: "₹20,000",
      bike: "Royal Enfield Classic 350",
      femaleOnly: true,
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
      description: "An all-female expedition to the beautiful Spiti Valley.",
      route: [
        { latitude: 30.7333, longitude: 76.7794 }, // Chandigarh
        { latitude: 31.1048, longitude: 77.1734 }, // Shimla
        { latitude: 31.9534, longitude: 77.122 }, // Rampur
        { latitude: 31.63, longitude: 78.05 }, // Kalpa
        { latitude: 32.03, longitude: 78.25 }, // Kaza
      ],
      members: [
        { id: "6", name: "Meera", image: "https://randomuser.me/api/portraits/women/3.jpg" },
        { id: "7", name: "Anjali", image: "https://randomuser.me/api/portraits/women/4.jpg" },
        { id: "8", name: "Ritu", image: "https://randomuser.me/api/portraits/women/5.jpg" },
      ],
    },
  ]
  
  export const mockUsers = [
    {
      id: "1",
      name: "Rahul",
      email: "rahul@example.com",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      bio: "Passionate rider with 5 years of experience",
      bike: "Royal Enfield Himalayan",
    },
    {
      id: "2",
      name: "Priya",
      email: "priya@example.com",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "Adventure enthusiast and nature lover",
      bike: "KTM Duke 250",
    },
  ]
  
  export const mockMessages = [
    {
      id: "1",
      senderId: "1",
      text: "Hey everyone! Ready for our trip tomorrow?",
      timestamp: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      senderId: "2",
      text: "Yes! I've packed everything. So excited!",
      timestamp: "2023-06-15T10:32:00Z",
    },
    {
      id: "3",
      senderId: "3",
      text: "I'll bring some extra tools just in case.",
      timestamp: "2023-06-15T10:35:00Z",
    },
    {
      id: "4",
      senderId: "1",
      text: "Great! Let's meet at the starting point at 6 AM.",
      timestamp: "2023-06-15T10:40:00Z",
    },
  ]
  
  