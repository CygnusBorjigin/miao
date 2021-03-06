// import frameworks
const axios = require('axios');
const fs = require('fs');
const connectDB = require('./config/db.js');

connectDB();

const Price = require('./models/Price');

const target = ['Name', '3M', 'A. O. Smith', 'Abbott Laboratories', 'AbbVie', 'Abiomed', 'Accenture', 'Activision Blizzard', 'ADM', 'Adobe', 'Advance Auto Parts', 'Advanced Micro Devices', 'AES Corp', 'Aflac', 'Agilent Technologies', 'Air Products & Chemicals', 'Akamai Technologies', 'Alaska Air Group', 'Albemarle Corporation', 'Alexandria Real Estate Equities', 'Align Technology', 'Allegion', 'Alliant Energy', 'Allstate Corp', 'Alphabet (Class A)', 'Alphabet (Class C)', 'Altria Group', 'Amazon', 'Amcor', 'Ameren Corp', 'American Airlines Group', 'American Electric Power', 'American Express', 'American International Group', 'American Tower', 'American Water Works', 'Ameriprise Financial', 'AmerisourceBergen', 'Ametek', 'Amgen', 'Amphenol', 'Analog Devices', 'Ansys', 'Anthem', 'Aon', 'APA Corporation', 'Apple', 'Applied Materials', 'Aptiv', 'Arista Networks', 'Arthur J. Gallagher & Co.', 'Assurant', 'AT&T', 'Atmos Energy', 'Autodesk', 'Automatic Data Processing', 'AutoZone', 'AvalonBay Communities', 'Avery Dennison', 'Baker Hughes', 'Ball Corp', 'Bank of America', 'Bath & Body Works Inc.', 'Baxter International', 'Becton Dickinson', 'Berkshire Hathaway', 'Best Buy', 'Bio-Rad Laboratories', 'Bio-Techne', 'Biogen', 'BlackRock', 'BNY Mellon', 'Boeing', 'Booking Holdings', 'BorgWarner', 'Boston Properties', 'Boston Scientific', 'Bristol Myers Squibb', 'Broadcom', 'Broadridge Financial Solutions', 'Brown & Brown', 'Brown–Forman', 'C. H. Robinson', 'Cadence Design Systems', 'Caesars Entertainment', 'Campbell Soup', 'Capital One Financial', 'Cardinal Health', 'CarMax', 'Carnival Corporation', 'Carrier Global', 'Catalent', 'Caterpillar', 'Cboe Global Markets', 'CBRE', 'CDW', 'Celanese', 'Centene Corporation', 'CenterPoint Energy', 'Ceridian', 'Cerner', 'CF Industries', 'Charles River Laboratories', 'Charles Schwab Corporation', 'Charter Communications', 'Chevron Corporation', 'Chipotle Mexican Grill', 'Chubb', 'Church & Dwight', 'Cigna', 'Cincinnati Financial', 'Cintas Corporation', 'Cisco Systems', 'Citigroup', 'Citizens Financial Group', 'Citrix Systems', 'Clorox', 'CME Group', 'CMS Energy', 'Coca-Cola Company', 'Cognizant Technology Solutions', 'Colgate-Palmolive', 'Comcast', 'Comerica', 'Conagra Brands', 'ConocoPhillips', 'Consolidated Edison', 'Constellation Brands', 'Copart', 'Corning', 'Corteva', 'Costco', 'Coterra', 'Crown Castle', 'CSX', 'Cummins', 'CVS Health', 'D. R. Horton', 'Danaher Corporation', 'Darden Restaurants', 'DaVita', 'Deere & Co.', 'Delta Air Lines', 'Dentsply Sirona', 'Devon Energy', 'DexCom', 'Diamondback Energy', 'Digital Realty Trust', 'Discover Financial Services', 'Discovery (Series A)', 'Discovery (Series C)', 'Dish Network', 'Dollar General', 'Dollar Tree', 'Dominion Energy', "Domino's Pizza", 'Dover Corporation', 'Dow', 'DTE Energy', 'Duke Energy', 'Duke Realty Corp', 'DuPont', 'DXC Technology', 'Eastman Chemical', 'Eaton Corporation', 'eBay', 'Ecolab', 'Edison International', 'Edwards Lifesciences', 'Electronic Arts', 'Eli Lilly & Co', 'Emerson Electric Company', 'Enphase Energy', 'Entergy', 'EOG Resources', 'Equifax', 'Equinix', 'Equity Residential', 'Essex Property Trust', 'Estée Lauder Companies', 'Etsy', 'Everest Re', 'Evergy', 'Eversource Energy', 'Exelon', 'Expedia Group', 'Expeditors', 'Extra Space Storage', 'ExxonMobil', 'F5 Networks', 'Facebook', 'Fastenal', 'Federal Realty Investment Trust', 'FedEx', 'Fidelity National Information Services', 'Fifth Third Bancorp', 'First Republic Bank', 'FirstEnergy', 'Fiserv', 'Fleetcor', 'FMC Corporation', 'Ford', 'Fortinet', 'Fortive', 'Fortune Brands Home & Security', 'Fox Corporation (Class A)', 'Fox Corporation (Class B)', 'Franklin Resources', 'Freeport-McMoRan', 'Gap', 'Garmin', 'Gartner', 'Generac Holdings', 'General Dynamics', 'General Electric', 'General Mills', 'General Motors', 'Genuine Parts', 'Gilead Sciences', 'Global Payments', 'Globe Life', 'Goldman Sachs', 'Halliburton', 'Hanesbrands', 'Hasbro', 'HCA Healthcare', 'Healthpeak Properties', 'Henry Schein', 'Hess Corporation', 'Hewlett Packard Enterprise', 'Hilton Worldwide', 'Hologic', 'Home Depot', 'Honeywell', 'Hormel', 'Host Hotels & Resorts', 'Howmet Aerospace', 'HP', 'Humana', 'Huntington Bancshares', 'Huntington Ingalls Industries', 'IBM', 'IDEX Corporation', 'Idexx Laboratories', 'IHS Markit', 'Illinois Tool Works', 'Illumina', 'Incyte', 'Ingersoll Rand', 'Intel', 'Intercontinental Exchange', 'International Flavors & Fragrances', 'International Paper', 'Interpublic Group', 'Intuit', 'Intuitive Surgical', 'Invesco', 'IPG Photonics', 'IQVIA', 'Iron Mountain', 'J. B. Hunt', 'Jack Henry & Associates', 'Jacobs Engineering Group', 'JM Smucker', 'Johnson & Johnson', 'Johnson Controls', 'JPMorgan Chase', 'Juniper Networks', 'Kansas City Southern', "Kellogg's", 'KeyCorp', 'Keysight Technologies', 'Kimberly-Clark', 'Kimco Realty', 'Kinder Morgan', 'KLA Corporation', 'Kraft Heinz', 'Kroger', 'L3Harris Technologies', 'LabCorp', 'Lam Research', 'Lamb Weston', 'Las Vegas Sands', 'Leggett & Platt', 'Leidos', 'Lennar', 'Lincoln National', 'Linde', 'Live Nation Entertainment', 'LKQ Corporation', 'Lockheed Martin', 'Loews Corporation', "Lowe's", 'Lumen Technologies', 'LyondellBasell', 'M&T Bank', 'Marathon Oil', 'Marathon Petroleum', 'MarketAxess', 'Marriott International', 'Marsh & McLennan', 'Martin Marietta Materials', 'Masco', 'Mastercard', 'Match Group', 'McCormick & Company', "McDonald's", 'McKesson Corporation', 'Medtronic', 'Merck & Co.', 'MetLife', 'Mettler Toledo', 'MGM Resorts International', 'Microchip Technology', 'Micron Technology', 'Microsoft', 'Mid-America Apartments', 'Moderna', 'Mohawk Industries', 'Molson Coors Beverage Company', 'Mondelez International', 'Monolithic Power Systems', 'Monster Beverage', "Moody's Corporation", 'Morgan Stanley', 'Motorola Solutions', 'MSCI', 'Nasdaq', 'NetApp', 'Netflix', 'Newell Brands', 'Newmont', 'News Corp (Class A)', 'News Corp (Class B)', 'NextEra Energy', 'Nielsen Holdings', 'Nike', 'NiSource', 'Norfolk Southern', 'Northern Trust', 'Northrop Grumman', 'NortonLifeLock', 'Norwegian Cruise Line Holdings', 'NRG Energy', 'Nucor', 'Nvidia', 'NVR', 'NXP', "O'Reilly Automotive", 'Occidental Petroleum', 'Old Dominion Freight Line', 'Omnicom Group', 'Oneok', 'Oracle', 'Organon & Co.', 'Otis Worldwide', 'Paccar', 'Packaging Corporation of America', 'Parker-Hannifin', 'Paychex', 'Paycom', 'PayPal', 'Penn National Gaming', 'Pentair', "People's United Financial", 'PepsiCo', 'PerkinElmer', 'Pfizer', 'Philip Morris International', 'Phillips 66', 'Pinnacle West Capital', 'Pioneer Natural Resources', 'PNC Financial Services', 'Pool Corporation', 'PPG Industries', 'PPL', 'Principal Financial Group', 'Procter & Gamble', 'Progressive Corporation', 'Prologis', 'Prudential Financial', 'PTC', 'Public Service Enterprise Group', 'Public Storage', 'PulteGroup', 'PVH', 'Qorvo', 'Qualcomm', 'Quanta Services', 'Quest Diagnostics', 'Ralph Lauren Corporation', 'Raymond James Financial', 'Raytheon Technologies', 'Realty Income Corporation', 'Regency Centers', 'Regeneron Pharmaceuticals', 'Regions Financial Corporation', 'Republic Services', 'ResMed', 'Robert Half International', 'Rockwell Automation', 'Rollins', 'Roper Technologies', 'Ross Stores', 'Royal Caribbean Group', 'S&P Global', 'Salesforce', 'SBA Communications', 'Schlumberger', 'Seagate Technology', 'Sealed Air', 'Sempra Energy', 'ServiceNow', 'Sherwin-Williams', 'Simon Property Group', 'Skyworks Solutions', 'Snap-on', 'Southern Company', 'Southwest Airlines', 'Stanley Black & Decker', 'Starbucks', 'State Street Corporation', 'Steris', 'Stryker Corporation', 'SVB Financial', 'Synchrony Financial', 'Synopsys', 'Sysco', 'T-Mobile US', 'T. Rowe Price', 'Take-Two Interactive', 'Tapestry', 'Target Corporation', 'TE Connectivity', 'Teledyne Technologies', 'Teleflex', 'Teradyne', 'Tesla', 'Texas Instruments', 'Textron', 'The Cooper Companies', 'The Hartford', 'The Hershey Company', 'The Mosaic Company', 'The Travelers Companies', 'The Walt Disney Company', 'Thermo Fisher Scientific', 'TJX Companies', 'Tractor Supply Company', 'Trane Technologies', 'TransDigm Group', 'Trimble', 'Truist Financial', 'Twitter', 'Tyler Technologies', 'Tyson Foods', 'U.S. Bancorp', 'UDR', 'Ulta Beauty', 'Under Armour (Class A)', 'Under Armour (Class C)', 'Union Pacific', 'United Airlines', 'United Parcel Service', 'United Rentals', 'UnitedHealth Group', 'Universal Health Services', 'Valero Energy', 'Ventas', 'Verisign', 'Verisk Analytics', 'Verizon Communications', 'Vertex Pharmaceuticals', 'VF Corporation', 'ViacomCBS', 'Viatris', 'Visa', 'Vornado Realty Trust', 'Vulcan Materials', 'W. R. Berkley Corporation', 'W. W. Grainger', 'Wabtec', 'Walgreens Boots Alliance', 'Walmart', 'Waste Management', 'Waters Corporation', 'WEC Energy Group', 'Wells Fargo', 'Welltower', 'West Pharmaceutical Services', 'Western Digital', 'Western Union', 'WestRock', 'Weyerhaeuser', 'Whirlpool Corporation', 'Williams Companies', 'Willis Towers Watson', 'Wynn Resorts', 'Xcel Energy', 'Xilinx', 'Xylem', 'Yum! Brands', 'Zebra Technologies', 'Zimmer Biomet', 'Zions Bancorp', 'Zoetis'];

const notworking = [];

const getPosition = (string, subString, index) => {
  return string.split(subString, index).join(subString).length;
};

const cleanPrice = (rawString) => {
	const index = getPosition(rawString, " ", 1);
	return rawString.substring(0, index);
}

const getRawData = async (target_name) => {
	try {
		const target_name_mod = target_name.split(' ').join('+');
		console.log(target_name_mod);
		var config = {
			method: 'get',
  			url: `https://www.google.com/search?q=${target_name_mod}+stock+price`,
  			headers: { 
    				'Cookie': '1P_JAR=2022-03-15-17; NID=511=mct2HN5CGR6tYa0Sl68bcCOkLgK8zN_D34FByVD3ZvZsmoejcDMLnbkwndsLmzQJiQiXWgTU-Sw1OcFVW8jMkexZ5oFIEsn6PV83Q0iYwBXfCKn7VRQqAsMrhaC8Sj0CsiGwyg-iTkR8z8YUPgYD5S1P-W5PYf4k78_utHNosFI'
  			}
		};

		const result = await axios(config);
		const rawData = result.data;

		// get price
		const index = getPosition(rawData, "BNeawe iBp4i AP7Wnd", 2);
		const price = rawData.substring(index+21, index+31);
		const cleaned = cleanPrice(price);

		// order data
		const dateObj = new Date();
		const date = dateObj.toDateString();
		const time = dateObj.toTimeString();

		incoming = new Price ({
			name: target_name,
			obtainedTime: {
				date,
				time,
			},
			price: cleaned
		});
		const res = await incoming.save();
		console.log(res);

	} catch (err) {
		const error = {
				name: target_name,
				message: err
			};
			notworking.push(error);
	}

};


target.forEach(( each, index ) => {
		setTimeout(() => {
			getRawData(each);
		}, index * 5000);
	});
	console.log(notworking);




