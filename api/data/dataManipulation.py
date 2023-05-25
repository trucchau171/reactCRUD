import json
import requests
import prettytable

# series: JTS + industrycode(6 digit) + 000000000LDL



series_id = ["JTS000000000000000LDL", "JTS100000000000000LDL", "JTS110099000000000LDL", "JTS230000000000000LDL", "JTS300000000000000LDL","JTS320000000000000LDL", "JTS340000000000000LDL", "JTS400000000000000LDL", "JTS420000000000000LDL", "JTS440000000000000LDL", "JTS480099000000000LDL", "JTS510000000000000LDL", "JTS510099000000000LDL", "JTS520000000000000LDL", "JTS530000000000000LDL", "JTS540099000000000LDL", "JTS600000000000000LDL", "JTS610000000000000LDL", "JTS620000000000000LDL", "JTS700000000000000LDL", "JTS710000000000000LDL", "JTS720000000000000LDL", "JTS810000000000000LDL", "JTS900000000000000LDL", "JTS910000000000000LDL", "JTS920000000000000LDL", "JTS923000000000000LDL", "JTS929000000000000LDL"]
industry_id = ["000000", "100000", "110099", "230000", "300000", "320000", "340000", "400000", "420000", "440000", "480099", "510000", "510099", "520000", "530000", "540099", "600000", "610000", "620000", "700000", "710000", "720000", "810000", "900000", "910000", "920000", "923000", "929000"]
industries = ["Total nonfarm", "Total private", "Mining and logging", "Construction", "Manufacturing", "Durable goods manufacturing", "Nondurable goods manufacturing", "Trade, transportation, and utilities", "Wholesale trade", "Retail trade", "Transportation, warehousing, and utilities", "Information", "Financial activities", "Finance and insurance", "Real estate and rental and leasing", "Professional and business services", "Education and health services", "Educational services", "Health care and social assistance",
"Leisure and hospitality", "Arts, entertainment, and recreation", "Accommodation and food services", "Other services", "Government", "Federal", "State and local", "State and local government education", "State and local government, excluding education"]

industry_map = dict()
for i in range(len(series_id)):
    industry_map[industry_id[i]] = industries[i]

header = {'Content-type': 'application/json'}

# Get data from api and write to industries.json
payload = json.dumps({"seriesid": series_id})
response = requests.post("https://api.bls.gov/publicAPI/v2/timeseries/data/", data=payload, headers=header)
layoff_data = json.loads(response.text)
output = open("industries.json", "w")
output.write(response.text)
output.close()


data_json = open("industries.json", "r")
data = json.load(data_json)
data_json.close()

# Each industry each month 
# result = []
# for datum in data['Results']['series']:
#     seriesId = datum['seriesID']
#     industry = industry_map[seriesId[3:9]]
#     for item in datum['data']:
#         year = item['year']
#         month = item['period']
#         month_int = int(month[1:3])
#         value = int(item['value'])
#         time = year + "/" + str(month_int)
#         result.append({"Time": time, "Industry": industry, "NumberOfLayOff": value})

# output = open("industries_result.json", "w")
# output.write(json.dumps(result))
# output.close()


# Each industry, Each quarter
total = []
for datum in data['Results']['series']:
    seriesId = datum['seriesID']
    industry = industry_map[seriesId[3:9]]
    sumQuarter = 0
    for item in datum['data']:
        year = item['year']
        month = item['period']
        month_int = int(month[1:3])
        value = int(item['value'])
        time = year + "/" + str(month_int)
        sumQuarter += value

        if month_int == 3 or month_int == 6 or month_int == 9 or month_int == 12:
            total.append({"Time": time, "Industry": industry, "NumberOfLayOff": value})
            sumQuarter = 0

output = open("industries_total.json", "w")
output.write(json.dumps(total))
output.close()

# Fix company data from old dataset company_json.json
company_json = open("company_json.json", "r")
company = json.load(company_json)
company_json.close()

company_time = []

for datum in company:
    comp = datum['Company']
    year = datum['Year']
    quarter = datum['Quarter']
    value = datum['NumberOfLayOff']
    month = ""
    if(quarter == "Q1"):
        month = "3"
    if(quarter == "Q2"):
        month = "6"
    if(quarter == "Q3"):
        month = "9"
    if(quarter == "Q4"):
        month = "12"
    time = str(year) + "/" + month
    company_time.append({"Time": time, "Company": comp, "NumberOfLayOff": value})

output = open("company.json", "w")
output.write(json.dumps(company_time))
output.close()