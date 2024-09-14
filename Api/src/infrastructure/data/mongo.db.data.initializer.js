const User = require("../../models/user.model");
const logger = require("../../utils/logger");

const seedDatabaseAsync = async () => {
	try {
		await seedUsers();
	} catch (error) {
		logger.error("Error seeding data:", error);
	} finally {
	}
};

const seedUsers = async () => {
	try {
		const users = [
			{
				fullName: "John Doe",
				phoneNumber: "+1 123-456-7890",
				email: "johndoe@example.com",
				address: "123 Main St, Springfield, IL",
				password: "password123",
			},
			{
				fullName: "Jane Smith",
				phoneNumber: "+1 234-567-8901",
				email: "janesmith@example.com",
				address: "456 Oak St, Chicago, IL",
				password: "pass1234",
			},
			{
				fullName: "Robert Johnson",
				phoneNumber: "+1 345-678-9012",
				email: "robert.j@example.com",
				address: "789 Pine St, Boston, MA",
				password: "robertpass",
			},
			{
				fullName: "Alice Williams",
				phoneNumber: "+1 456-789-0123",
				email: "alice.w@example.com",
				address: "321 Maple St, Seattle, WA",
				password: "alice2021",
			},
			{
				fullName: "David Brown",
				phoneNumber: "+1 567-890-1234",
				email: "david.b@example.com",
				address: "654 Cedar St, Austin, TX",
				password: "davidbrown",
			},
			{
				fullName: "Emily Davis",
				phoneNumber: "+1 678-901-2345",
				email: "emily.d@example.com",
				address: "987 Birch St, Denver, CO",
				password: "emily123",
			},
			{
				fullName: "Michael Miller",
				phoneNumber: "+1 789-012-3456",
				email: "michael.m@example.com",
				address: "258 Walnut St, San Francisco, CA",
				password: "mike2020",
			},
			{
				fullName: "Sarah Wilson",
				phoneNumber: "+1 890-123-4567",
				email: "sarah.w@example.com",
				address: "369 Elm St, Dallas, TX",
				password: "sarahpass",
			},
			{
				fullName: "James Moore",
				phoneNumber: "+1 901-234-5678",
				email: "james.m@example.com",
				address: "741 Ash St, Miami, FL",
				password: "moorepass",
			},
			{
				fullName: "Jessica Taylor",
				phoneNumber: "+1 012-345-6789",
				email: "jessica.t@example.com",
				address: "852 Fir St, Orlando, FL",
				password: "taylorjess",
			},
			{
				fullName: "William Anderson",
				phoneNumber: "+1 111-222-3333",
				email: "william.a@example.com",
				address: "963 Oak St, Los Angeles, CA",
				password: "will2022",
			},
			{
				fullName: "Olivia Thomas",
				phoneNumber: "+1 222-333-4444",
				email: "olivia.t@example.com",
				address: "147 Pine St, Phoenix, AZ",
				password: "oliviathomas",
			},
			{
				fullName: "Henry Jackson",
				phoneNumber: "+1 333-444-5555",
				email: "henry.j@example.com",
				address: "369 Maple St, San Diego, CA",
				password: "henrypass",
			},
			{
				fullName: "Sophia White",
				phoneNumber: "+1 444-555-6666",
				email: "sophia.w@example.com",
				address: "456 Birch St, Portland, OR",
				password: "sophiawhite",
			},
			{
				fullName: "Liam Harris",
				phoneNumber: "+1 555-666-7777",
				email: "liam.h@example.com",
				address: "753 Cedar St, New York, NY",
				password: "liamh123",
			},
			{
				fullName: "Ava Martin",
				phoneNumber: "+1 666-777-8888",
				email: "ava.m@example.com",
				address: "159 Elm St, Las Vegas, NV",
				password: "avamartin",
			},
			{
				fullName: "Noah Lee",
				phoneNumber: "+1 777-888-9999",
				email: "noah.l@example.com",
				address: "258 Ash St, Houston, TX",
				password: "noahlee21",
			},
			{
				fullName: "Isabella Clark",
				phoneNumber: "+1 888-999-0000",
				email: "isabella.c@example.com",
				address: "357 Walnut St, Atlanta, GA",
				password: "clark2020",
			},
			{
				fullName: "Mason Lewis",
				phoneNumber: "+1 999-000-1111",
				email: "mason.l@example.com",
				address: "654 Fir St, Tampa, FL",
				password: "masonlewis",
			},
			{
				fullName: "Mia Walker",
				phoneNumber: "+1 000-111-2222",
				email: "mia.w@example.com",
				address: "123 Oak St, Sacramento, CA",
				password: "walker21",
			},
			{
				fullName: "Lucas Hall",
				phoneNumber: "+1 111-222-3334",
				email: "lucas.h@example.com",
				address: "321 Pine St, Minneapolis, MN",
				password: "lucaspass",
			},
			{
				fullName: "Charlotte Young",
				phoneNumber: "+1 222-333-4445",
				email: "charlotte.y@example.com",
				address: "456 Birch St, Nashville, TN",
				password: "youngc2022",
			},
			{
				fullName: "Ethan King",
				phoneNumber: "+1 333-444-5556",
				email: "ethan.k@example.com",
				address: "789 Cedar St, Charlotte, NC",
				password: "kingethan",
			},
			{
				fullName: "Amelia Scott",
				phoneNumber: "+1 444-555-6667",
				email: "amelia.s@example.com",
				address: "963 Maple St, Baltimore, MD",
				password: "scottamelia",
			},
			{
				fullName: "Alexander Green",
				phoneNumber: "+1 555-666-7778",
				email: "alexander.g@example.com",
				address: "852 Elm St, Columbus, OH",
				password: "greena2020",
			},
		];

		if ((await User.countDocuments()) === 0) {
			await User.insertMany(users);
			logger.info("Data seeded successfully");
		}
	} catch (error) {
		logger.error("Error seeding data:", error);
	}
};

module.exports = {
	seedDatabaseAsync,
};
