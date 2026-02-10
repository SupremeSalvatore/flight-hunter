export interface Airport {
  geoId: string;
  value: string;
  label: string;
  countryIsoCode: string;
  cityName?: string;
  imageUrl?: string;
}

export const airports: Airport[] = [
  // Top European Holiday Destinations
  {
    geoId: '3115882',
    value: 'BCN',
    label: 'Barselona (BCN)',
    countryIsoCode: 'ES',
    cityName: 'Barselona',
    imageUrl:
      'https://assets.airtrfx.com/media-em/ju/67054438dd9f6_barcelona_1500x500_1.jpg'
  },
  {
    geoId: '6269554',
    value: 'CDG',
    label: 'Pariz (CDG)',
    countryIsoCode: 'FR',
    cityName: 'Pariz'
  },
  {
    geoId: '6299619',
    value: 'FCO',
    label: 'Rim (FCO)',
    countryIsoCode: 'IT',
    cityName: 'Rim'
  },
  {
    geoId: '2647216',
    value: 'LHR',
    label: 'London (LHR)',
    countryIsoCode: 'GB',
    cityName: 'London'
  },
  {
    geoId: '6296680',
    value: 'AMS',
    label: 'Amsterdam (AMS)',
    countryIsoCode: 'NL',
    cityName: 'Amsterdam'
  },
  {
    geoId: '6299484',
    value: 'ATH',
    label: 'Atina (ATH)',
    countryIsoCode: 'GR',
    cityName: 'Atina'
  },
  {
    geoId: '6301792',
    value: 'LIS',
    label: 'Lisabon (LIS)',
    countryIsoCode: 'PT',
    cityName: 'Lisabon'
  },
  {
    geoId: '3219415',
    value: 'VCE',
    label: 'Venecija (VCE)',
    countryIsoCode: 'IT',
    cityName: 'Venecija'
  },
  {
    geoId: '6299654',
    value: 'PRG',
    label: 'Prag (PRG)',
    countryIsoCode: 'CZ',
    cityName: 'Prag'
  },
  {
    geoId: '6299314',
    value: 'DBV',
    label: 'Dubrovnik (DBV)',
    countryIsoCode: 'HR',
    cityName: 'Dubrovnik'
  },
  {
    geoId: '6299511',
    value: 'JTR',
    label: 'Santorini (JTR)',
    countryIsoCode: 'GR',
    cityName: 'Santorini'
  },
  {
    geoId: '6299743',
    value: 'IST',
    label: 'Istanbul (IST)',
    countryIsoCode: 'TR',
    cityName: 'Istanbul'
  },
  {
    geoId: '3215304',
    value: 'SPU',
    label: 'Split (SPU)',
    countryIsoCode: 'HR',
    cityName: 'Split'
  },
  {
    geoId: '2761335',
    value: 'VIE',
    label: 'Beč (VIE)',
    countryIsoCode: 'AT',
    cityName: 'Beč'
  },
  {
    geoId: '6299345',
    value: 'MAD',
    label: 'Madrid (MAD)',
    countryIsoCode: 'ES',
    cityName: 'Madrid'
  },
  {
    geoId: '3174133',
    value: 'MXP',
    label: 'Milano (MXP)',
    countryIsoCode: 'IT',
    cityName: 'Milano'
  },
  {
    geoId: '6299729',
    value: 'AYT',
    label: 'Antalija (AYT)',
    countryIsoCode: 'TR',
    cityName: 'Antalija'
  },
  {
    geoId: '6299346',
    value: 'AGP',
    label: 'Malaga (AGP)',
    countryIsoCode: 'ES',
    cityName: 'Malaga'
  },
  {
    geoId: '6299349',
    value: 'PMI',
    label: 'Majorka (PMI)',
    countryIsoCode: 'ES',
    cityName: 'Majorka'
  },
  {
    geoId: '6299418',
    value: 'NCE',
    label: 'Nica (NCE)',
    countryIsoCode: 'FR',
    cityName: 'Nica'
  },
  {
    geoId: '6299339',
    value: 'IBZ',
    label: 'Ibica (IBZ)',
    countryIsoCode: 'ES',
    cityName: 'Ibica'
  },
  {
    geoId: '6299495',
    value: 'CFU',
    label: 'Krf (CFU)',
    countryIsoCode: 'GR',
    cityName: 'Krf'
  },
  {
    geoId: '6299500',
    value: 'JMK',
    label: 'Mikonos (JMK)',
    countryIsoCode: 'GR',
    cityName: 'Mikonos'
  },
  {
    geoId: '6301777',
    value: 'RHO',
    label: 'Rodos (RHO)',
    countryIsoCode: 'GR',
    cityName: 'Rodos'
  },
  {
    geoId: '6299488',
    value: 'HER',
    label: 'Iraklion (Krit) (HER)',
    countryIsoCode: 'GR',
    cityName: 'Iraklion'
  },
  {
    geoId: '2562787',
    value: 'MLA',
    label: 'Malta (MLA)',
    countryIsoCode: 'MT',
    cityName: 'Malta'
  },
  {
    geoId: '6299688',
    value: 'OPO',
    label: 'Porto (OPO)',
    countryIsoCode: 'PT',
    cityName: 'Porto'
  },
  {
    geoId: '414646',
    value: 'LCA',
    label: 'Larnaka (LCA)',
    countryIsoCode: 'CY',
    cityName: 'Larnaka',
    imageUrl: 'https://assets.airtrfx.com/media-em/ju/cities/LCA_Larnaca.jpg'
  },
  {
    geoId: '6299771',
    value: 'BJV',
    label: 'Bodrum (BJV)',
    countryIsoCode: 'TR',
    cityName: 'Bodrum'
  },
  {
    geoId: '6296627',
    value: 'EDI',
    label: 'Edinburg (EDI)',
    countryIsoCode: 'GB',
    cityName: 'Edinburg'
  },

  // Other European Destinations (Alphabetically)
  {
    geoId: '6296624',
    value: 'ABZ',
    label: 'Aberdin (ABZ)',
    countryIsoCode: 'GB',
    cityName: 'Aberdin'
  },
  {
    geoId: '12719918',
    value: 'COV',
    label: 'Adana (COV)',
    countryIsoCode: 'TR',
    cityName: 'Adana'
  },
  {
    geoId: '6299483',
    value: 'AXD',
    label: 'Aleksandropolis (AXD)',
    countryIsoCode: 'GR',
    cityName: 'Aleksandropolis'
  },
  {
    geoId: '7668334',
    value: 'GZP',
    label: 'Alanja (GZP)',
    countryIsoCode: 'TR',
    cityName: 'Alanja'
  },
  {
    geoId: '6299565',
    value: 'AHO',
    label: 'Algero (Sardinija) (AHO)',
    countryIsoCode: 'IT',
    cityName: 'Algero'
  },
  {
    geoId: '6255112',
    value: 'ALC',
    label: 'Alikante (ALC)',
    countryIsoCode: 'ES',
    cityName: 'Alikante'
  },
  {
    geoId: '6296721',
    value: 'ALF',
    label: 'Alta (ALF)',
    countryIsoCode: 'NO',
    cityName: 'Alta'
  },
  {
    geoId: '6299725',
    value: 'ESB',
    label: 'Ankara (ESB)',
    countryIsoCode: 'TR',
    cityName: 'Ankara'
  },
  {
    geoId: '6300924',
    value: 'GYD',
    label: 'Baku (GYD)',
    countryIsoCode: 'AZ',
    cityName: 'Baku'
  },
  {
    geoId: '6299693',
    value: 'BNX',
    label: 'Banja Luka (BNX)',
    countryIsoCode: 'BA',
    cityName: 'Banja Luka'
  },
  {
    geoId: '6299535',
    value: 'BRI',
    label: 'Bari (BRI)',
    countryIsoCode: 'IT',
    cityName: 'Bari',
    imageUrl: 'https://assets.airtrfx.com/media-em/ju/cities/BRI_Bari.jpg'
  },
  {
    geoId: '6296570',
    value: 'BHD',
    label: 'Belfast (BHD)',
    countryIsoCode: 'GB',
    cityName: 'Belfast'
  },
  {
    geoId: '6299779',
    value: 'BEG',
    label: 'Beograd (BEG)',
    countryIsoCode: 'RS',
    cityName: 'Beograd'
  },
  {
    geoId: '6296727',
    value: 'BGO',
    label: 'Bergen (BGO)',
    countryIsoCode: 'NO',
    cityName: 'Bergen'
  },
  {
    geoId: '8181624',
    value: 'BER',
    label: 'Berlin (BER)',
    countryIsoCode: 'DE',
    cityName: 'Berlin'
  },
  {
    geoId: '6299328',
    value: 'BIO',
    label: 'Bilbao (BIO)',
    countryIsoCode: 'ES',
    cityName: 'Bilbao'
  },
  {
    geoId: '6296572',
    value: 'BHX',
    label: 'Birmingem (BHX)',
    countryIsoCode: 'GB',
    cityName: 'Birmingem'
  },
  {
    geoId: '6296726',
    value: 'BOO',
    label: 'Bodo (BOO)',
    countryIsoCode: 'NO',
    cityName: 'Bodo'
  },
  {
    geoId: '6290247',
    value: 'BLQ',
    label: 'Bolonja (BLQ)',
    countryIsoCode: 'IT',
    cityName: 'Bolonja'
  },
  {
    geoId: '6299542',
    value: 'BDS',
    label: 'Brindizi (BDS)',
    countryIsoCode: 'IT',
    cityName: 'Brindizi'
  },
  {
    geoId: '6296486',
    value: 'BRU',
    label: 'Brisel (BRU)',
    countryIsoCode: 'BE',
    cityName: 'Brisel'
  },
  {
    geoId: '6296587',
    value: 'BRS',
    label: 'Bristol (BRS)',
    countryIsoCode: 'GB',
    cityName: 'Bristol'
  },
  {
    geoId: '6299519',
    value: 'BUD',
    label: 'Budimpešta (BUD)',
    countryIsoCode: 'HU',
    cityName: 'Budimpešta'
  },
  {
    geoId: '6301793',
    value: 'OTP',
    label: 'Bukurešt (OTP)',
    countryIsoCode: 'RO',
    cityName: 'Bukurešt'
  },
  {
    geoId: '6299722',
    value: 'ZRH',
    label: 'Cirih (ZRH)',
    countryIsoCode: 'CH',
    cityName: 'Cirih'
  },
  {
    geoId: '6296697',
    value: 'DUB',
    label: 'Dablin (DUB)',
    countryIsoCode: 'IE',
    cityName: 'Dablin'
  },
  {
    geoId: '6299756',
    value: 'DLM',
    label: 'Dalaman (DLM)',
    countryIsoCode: 'TR',
    cityName: 'Dalaman'
  },
  {
    geoId: '3206096',
    value: 'DUS',
    label: 'Diseldorf (DUS)',
    countryIsoCode: 'DE',
    cityName: 'Diseldorf',
    imageUrl: 'https://assets.airtrfx.com/media-em/ju/cities/DUS_Dusseldorf.jpg'
  },
  {
    geoId: '6290293',
    value: 'FRA',
    label: 'Frankfurt (FRA)',
    countryIsoCode: 'DE',
    cityName: 'Frankfurt'
  },
  {
    geoId: '6296790',
    value: 'GOT',
    label: 'Geteborg (GOT)',
    countryIsoCode: 'SE',
    cityName: 'Geteborg'
  },
  {
    geoId: '6296626',
    value: 'GLA',
    label: 'Glazgov (GLA)',
    countryIsoCode: 'GB',
    cityName: 'Glazgov'
  },
  {
    geoId: '3208174',
    value: 'HAM',
    label: 'Hamburg (HAM)',
    countryIsoCode: 'DE',
    cityName: 'Hamburg'
  },
  {
    geoId: '6301511',
    value: 'HEL',
    label: 'Helsinki (HEL)',
    countryIsoCode: 'FI',
    cityName: 'Helsinki'
  },
  {
    geoId: '6299750',
    value: 'ADB',
    label: 'Izmir (ADB)',
    countryIsoCode: 'TR',
    cityName: 'Izmir'
  },
  {
    geoId: '6290291',
    value: 'CTA',
    label: 'Katanija (CTA)',
    countryIsoCode: 'IT',
    cityName: 'Katanija'
  },
  {
    geoId: '6296510',
    value: 'CGN',
    label: 'Keln (CGN)',
    countryIsoCode: 'DE',
    cityName: 'Keln'
  },
  {
    geoId: '2619034',
    value: 'CPH',
    label: 'Kopenhagen (CPH)',
    countryIsoCode: 'DK',
    cityName: 'Kopenhagen'
  },
  {
    geoId: '6299493',
    value: 'KGS',
    label: 'Kos (KGS)',
    countryIsoCode: 'GR',
    cityName: 'Kos'
  },
  {
    geoId: '3103897',
    value: 'KRK',
    label: 'Krakov (KRK)',
    countryIsoCode: 'PL',
    cityName: 'Krakov'
  },
  {
    geoId: '6296608',
    value: 'LBA',
    label: 'Lids (LBA)',
    countryIsoCode: 'GB',
    cityName: 'Lids'
  },
  {
    geoId: '3215733',
    value: 'LJU',
    label: 'Ljubljana (LJU)',
    countryIsoCode: 'SI',
    cityName: 'Ljubljana'
  },
  {
    geoId: '6296718',
    value: 'LUX',
    label: 'Luksemburg (LUX)',
    countryIsoCode: 'LU',
    cityName: 'Luksemburg'
  },
  {
    geoId: '6296575',
    value: 'MAN',
    label: 'Mančester (MAN)',
    countryIsoCode: 'GB',
    cityName: 'Mančester'
  },
  {
    geoId: '6299417',
    value: 'MRS',
    label: 'Marsej (MRS)',
    countryIsoCode: 'FR',
    cityName: 'Marsej'
  },
  {
    geoId: '494811',
    value: 'SVO',
    label: 'Moskva (SVO)',
    countryIsoCode: 'RU',
    cityName: 'Moskva'
  },
  {
    geoId: '6299627',
    value: 'NAP',
    label: 'Napulj (NAP)',
    countryIsoCode: 'IT',
    cityName: 'Napulj'
  },
  {
    geoId: '6299780',
    value: 'INI',
    label: 'Niš (INI)',
    countryIsoCode: 'RS',
    cityName: 'Niš'
  },
  {
    geoId: '6299777',
    value: 'OHD',
    label: 'Ohrid (OHD)',
    countryIsoCode: 'MK',
    cityName: 'Ohrid'
  },
  {
    geoId: '3156088',
    value: 'OSL',
    label: 'Oslo (OSL)',
    countryIsoCode: 'NO',
    cityName: 'Oslo'
  },
  {
    geoId: '6299556',
    value: 'PMO',
    label: 'Palermo (PMO)',
    countryIsoCode: 'IT',
    cityName: 'Palermo'
  },
  {
    geoId: '6299503',
    value: 'PAS',
    label: 'Paros (PAS)',
    countryIsoCode: 'GR',
    cityName: 'Paros'
  },
  {
    geoId: '6299781',
    value: 'TGD',
    label: 'Podgorica (TGD)',
    countryIsoCode: 'ME',
    cityName: 'Podgorica',
    imageUrl: 'https://assets.airtrfx.com/media-em/ju/cities/TGD_Podgorica.jpg'
  },
  {
    geoId: '6299319',
    value: 'PUY',
    label: 'Pula (PUY)',
    countryIsoCode: 'HR',
    cityName: 'Pula'
  },
  {
    geoId: '456168',
    value: 'RIX',
    label: 'Riga (RIX)',
    countryIsoCode: 'LV',
    cityName: 'Riga'
  },
  {
    geoId: '3219203',
    value: 'RJK',
    label: 'Rijeka (RJK)',
    countryIsoCode: 'HR',
    cityName: 'Rijeka'
  },
  {
    geoId: '6299671',
    value: 'SZG',
    label: 'Salcburg (SZG)',
    countryIsoCode: 'AT',
    cityName: 'Salcburg'
  },
  {
    geoId: '6299509',
    value: 'SMI',
    label: 'Samos (SMI)',
    countryIsoCode: 'GR',
    cityName: 'Samos'
  },
  {
    geoId: '6299696',
    value: 'SJJ',
    label: 'Sarajevo (SJJ)',
    countryIsoCode: 'BA',
    cityName: 'Sarajevo'
  },
  {
    geoId: '6299778',
    value: 'SKP',
    label: 'Skoplje (SKP)',
    countryIsoCode: 'MK',
    cityName: 'Skoplje'
  },
  {
    geoId: '6299309',
    value: 'SOF',
    label: 'Sofija (SOF)',
    countryIsoCode: 'BG',
    cityName: 'Sofija'
  },
  {
    geoId: '6299514',
    value: 'SKG',
    label: 'Solun (SKG)',
    countryIsoCode: 'GR',
    cityName: 'Solun'
  },
  {
    geoId: '2725346',
    value: 'ARN',
    label: 'Stokholm (ARN)',
    countryIsoCode: 'SE',
    cityName: 'Stokholm'
  },
  {
    geoId: '588404',
    value: 'TLL',
    label: 'Taljin (TLL)',
    countryIsoCode: 'EE',
    cityName: 'Taljin'
  },
  {
    geoId: '3183874',
    value: 'TIA',
    label: 'Tirana (TIA)',
    countryIsoCode: 'AL',
    cityName: 'Tirana'
  },
  {
    geoId: '3220313',
    value: 'TIV',
    label: 'Tivat (TIV)',
    countryIsoCode: 'ME',
    cityName: 'Tivat',
    imageUrl: 'https://assets.airtrfx.com/media-em/ju/cities/TIV_Tivat.jpg'
  },
  {
    geoId: '6299576',
    value: 'TRN',
    label: 'Torino (TRN)',
    countryIsoCode: 'IT',
    cityName: 'Torino'
  },
  {
    geoId: '3220056',
    value: 'TRS',
    label: 'Trst (TRS)',
    countryIsoCode: 'IT',
    cityName: 'Trst'
  },
  {
    geoId: '6299357',
    value: 'VLC',
    label: 'Valensija (VLC)',
    countryIsoCode: 'ES',
    cityName: 'Valensija'
  },
  {
    geoId: '6296786',
    value: 'WAW',
    label: 'Varšava (WAW)',
    countryIsoCode: 'PL',
    cityName: 'Varšava'
  },
  {
    geoId: '3220360',
    value: 'ZAD',
    label: 'Zadar (ZAD)',
    countryIsoCode: 'HR',
    cityName: 'Zadar'
  },
  {
    geoId: '3215877',
    value: 'ZAG',
    label: 'Zagreb (ZAG)',
    countryIsoCode: 'HR',
    cityName: 'Zagreb'
  },
  {
    geoId: '6299516',
    value: 'ZTH',
    label: 'Zakintos (ZTH)',
    countryIsoCode: 'GR',
    cityName: 'Zakintos'
  },
  {
    geoId: '2660644',
    value: 'GVA',
    label: 'Ženeva (GVA)',
    countryIsoCode: 'CH',
    cityName: 'Ženeva'
  }
];

// Helper function to search airports
export const searchAirports = (query: string): Airport[] => {
  if (!query || query.length < 2) return [];

  const lowerQuery = query.toLowerCase();
  return airports
    .filter(
      (airport) =>
        airport.label.toLowerCase().includes(lowerQuery) ||
        airport.value.toLowerCase().includes(lowerQuery) ||
        airport.cityName?.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 10); // Limit to 10 results
};

// Get airport by code
export const getAirportByCode = (code: string): Airport | undefined => {
  return airports.find((airport) => airport.value === code.toUpperCase());
};
