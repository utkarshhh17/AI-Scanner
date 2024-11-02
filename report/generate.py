from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import io



# To run type - uvicorn generate:app --reload
# make sure all the packages are installed


app = FastAPI()


@app.post("/api")
async def create_report(request: Request):
    data = await request.json()
    # data = {
    #     "animal-details": {
    #         "animal-type": "cattle",
    #         "body-weight": 498.75,
    #         "breed": {
    #             "breed": "Cow-HF-Crossbreed",
    #             "interpretation": "No specific interpretation",
    #             "recommendation": "No specific recommendation"
    #         },
    #         "breed-grade": {
    #             "breed-grade": "Breed-Grade-A3",
    #             "interpretation": "No specific interpretation",
    #             "recommendation": "No specific recommendation"
    #         }
    #     },
    #     "animal-economic-status": {
    #         "bcs": {
    #             "interpretation": "No specific interpretation",
    #             "recommendation": "No specific recommendation",
    #             "value": 2.5
    #         },
    #         "breeding-capacity": "Fair",
    #         "buying-recommendation": "Physical Check required",
    #         "lactation-yield": "4550-5050",
    #         "market-value": "86000-92000",
    #         "milk yield": "22-26",
    #         "production-capacity": "26-30"
    #     },
    #     "diet": {
    #         "gd_fodder_based_diet": {
    #             "cmg-18": 0.0,
    #             "cmg-22": 8.41,
    #             "cotton-seed-cake": 0.0,
    #             "dairy-fortune": 0.48,
    #             "green-fodder": 20.78,
    #             "green-maize-fodder": 12.47,
    #             "grnd-nut-cake": 0.81,
    #             "maize-cracked": 0.83,
    #             "maize-silage": 0.0,
    #             "rs-ws-ps": 3.25
    #         },
    #         "ms_based_diet": {
    #             "cmg-18": 0.0,
    #             "cmg-22": 8.07,
    #             "cotton-seed-cake": 0.0,
    #             "dairy-fortune": 0.48,
    #             "green-fodder": 20.78,
    #             "green-maize-fodder": 0.0,
    #             "grnd-nut-cake": 0.81,
    #             "maize-cracked": 0.83,
    #             "maize-silage": 12.47,
    #             "rs-ws-ps": 1.79
    #         }
    #     },
    #     "general-health-condition": {
    #         "animal-alertness": "Could not determine animal alertness",
    #         "cleft-status": {
    #             "interpretation": "No specific interpretation",
    #             "recommendation": "No specific recommendation",
    #             "value": "Null"
    #         },
    #         "horn-status": {
    #             "interpretation": "This animal may Hurt other Cows by fighing or Because of Bad Vices Cow may bump into other people/Farmer.",
    #             "recommendation": "Follow disbudding protocols for her calf by electric disbudder or chemical solution, with Locally avilable Veterinary Doctor or Silo Fortune Veterinary Doctor.",
    #             "value": "Horn-Present"
    #         },
    #         "rumination-status": {
    #             "interpretation": "No specific interpretation",
    #             "recommendation": "No specific recommendation",
    #             "value": null
    #         },
    #         "skin-coat": {
    #             "interpretation": "May be due to moderate deficiency in Multi Minerals and high deficiency in micro minerals and multi vitamins.",
    #             "recommendation": "Feed Dairy Fortune 300 Grams Daily in a Concentrate feed/TMR ration, a unique and healthy Dairy Cow feeding solution OR Feed 70-100g of multi-mineral and vitamin mix daily as per veterinarians advice.",
    #             "value": "Skin-Coat-Moderately-Rough"
    #         },
    #         "teat-score": {
    #             "interpretation": "Teat Size is Small & Symmetrical",
    #             "recommendation": "Indicates they are Good Milkers, Use Teat Dips to prevent mastitis",
    #             "value": "Teat-Score-7"
    #         },
    #         "udder-type": {
    #             "interpretation": "Udder attached in a compact manner to the Ventral region above the Hock joint indicates Good Type of Udder & Less prone for Mastitis and Injury",
    #             "recommendation": "Good type of udder.To prevent Mastitis Use Teat Dips after Morning & Evening Milking.  Sol. V-Dip 500ml-1 .Regulary Check Subclinical Mastitis by CMT test. Sol. V-CMT 500ml-1",
    #             "value": "Udder-Compact"
    #         },
    #         "worm-load": {
    #             "interpretation": "Indicates possible infestation of animal by Round worm/Tape worm/Flat worm during grazing or by Vector contaminated fodder. You may be doing irregular Deworming, incorrect Deworming medication, or underdosing Deworming medicine.",
    #             "recommendation": "Your animal may need the Right deworming medicine in required dose. Contact a local Veterinary Doctor or Silo Fortune Veterinary Doctor for the Selecting better Deworming Medicine.",
    #             "value": "Worm-Load-Moderate"
    #         },
    #         "wound-status": {
    #             "interpretation": "No specific interpretation",
    #             "recommendation": "No specific recommendation",
    #             "value": "Null"
    #         }
    #     },
    #     "module-fsr-match": true,
    #     "system-of-disorder": {
    #         "digestive-system": {
    #             "diarrhea": {
    #                 "interpretation": "Digestive system of Animal is Looking  good, Follow the Good Feeding practices.",
    #                 "recommendation": "Provide Free Acess to Good quality water & Good Quality Feed & Fodder free from Fungus for better digestion.",
    #                 "value": false
    #             }
    #         },
    #         "metabolic-system": {
    #             "milk-fever": {
    #                 "interpretation": "Metabolic Disorders Occure during the crucial situations like During Dry period or immidiately after calving or During Peak Lactation. This may lead into Serious Economic Losses to the farmer.",
    #                 "recommendation": "To avoid this type of Situations, During the Dry Period, 15 days before calving Provide DCAD Powder 50-100Grams daily(Oral feeding) or Pow. Balanion 50-100Grams Oraly. From the Day of Calving Start feeding Mineral Mixture to the Cows as per recomendations.                                                                                ",
    #                 "value": false
    #             }
    #         },
    #         "skin-Sensory-organs": {
    #             "flea-bite": {
    #                 "interpretation": "Flies or Tick may causes Economic losses to Farmers. Regularly observe & Control the breeding spots.",
    #                 "recommendation": "Regularly Wash the Shed & Animal with KMno4 Solution.  Control the Fly breeding spots in & Around the Shed.   ",
    #                 "value": false
    #             }
    #         },
    #         "udder-mammary-system": {
    #             "mastitis": {
    #                 "interpretation": "Regularly screen your Cows milk by CMT test for detection of Subclinical mastitis & Follow Clean Milk Production Protocols to avoid Udder infections.",
    #                 "recommendation": " Monthly Once Do the CMT testing & Take advise from Silo Fortune Veterinary Doctor or Local Veterinary Doctors to cure Positive Cows better Milk Production.",
    #                 "value": false
    #             }
    #         },
    #         "viral-diseases": {
    #             "fmd": {
    #                 "interpretation": "No specific interpretation",
    #                 "recommendation": "No specific recommendation",
    #                 "value": false
    #             },
    #             "healthy": {
    #                 "interpretation": "Good, You are protected your Animal by Vaccination. Most of the Viral Diseases are Contagious & Acute. Out break May Cause Tremendous Economic Losses & sometimes Deaths. Only way to Prevent this Diseases by Periodic Vaccination Program, So Protect your Animals by Vaccinations.",
    #                 "recommendation": "Periodic Vaccination Program as Follows : FMD Vaccine  2ml   I/M    Every 6 months Once ,LSD Vaccine   2ml    S/C  Annualy once  OR As Recommended by Veterinary Doctors",
    #                 "value": true
    #             },
    #             "lsd": {
    #                 "interpretation": "No specific interpretation",
    #                 "recommendation": "No specific recommendation",
    #                 "value": false
    #             }
    #         }
    #     }
    # }

    env = Environment(loader=FileSystemLoader('.'))

    general_health_conditions_style = {
    'skin-coat': 'margin-bottom: 20rem; z-index: 5',
    'worm-load': 'margin-bottom:5rem; z-index: 5',
    'udder-type': 'margin-bottom:5rem;z-index: 5',
    'teat-score': 'margin-bottom:15rem; z-index: 5',
    # 'wound-status': 'margin-bottom:5rem; z-index: 1',
    'rumination-status': 'margin-bottom:8rem; z-index: 1'
    }

    animal_disease_style={
        "digestive-system":{"diarrhea": "5rem"},
        "udder-mammary-system":{"mastitis": "15rem"},
        "skin-Sensory-organs":{"flea-bite": "3rem"},
        "metabolic-system":{"milk-fever": "4rem"},
        "viral-diseases":{"lsd": "10rem"}
    }

    diet_data = {
        "Maize silage": [data['modelData']["diet"]["ms_based_diet"]["maize-silage"],
                         data['modelData']["diet"]["gd_fodder_based_diet"]["maize-silage"]],

        "Green Maize Fodder": [data['modelData']["diet"]["ms_based_diet"]["green-maize-fodder"],
                               data['modelData']["diet"]["gd_fodder_based_diet"]["green-maize-fodder"]],

        "Ragi Straw/Wheat Straw/Paddy Straw": [data['modelData']["diet"]["ms_based_diet"]["rs-ws-ps"],
                                               data['modelData']["diet"]["gd_fodder_based_diet"]["rs-ws-ps"]],

        "Green Fodder( BNH-11-14/Super Napier/COFS 29,30)": [data['modelData']["diet"]["ms_based_diet"]["green-fodder"],
                                                             data['modelData']["diet"]["gd_fodder_based_diet"]["green-fodder"]],

        "Cotton seed cake": [data['modelData']["diet"]["ms_based_diet"]["cotton-seed-cake"],
                             data['modelData']["diet"]["gd_fodder_based_diet"]["cotton-seed-cake"]],

        "Maize cracked": [data['modelData']["diet"]["ms_based_diet"]["maize-cracked"],
                          data['modelData']["diet"]["gd_fodder_based_diet"]["maize-cracked"]],

        "Groundnut cake": [data['modelData']["diet"]["ms_based_diet"]["grnd-nut-cake"],
                           data['modelData']["diet"]["gd_fodder_based_diet"]["grnd-nut-cake"]],

        "CARGILL Milkogen (8000)-18-20% CP": [data['modelData']["diet"]["ms_based_diet"]["cmg-18"],
                                              data['modelData']["diet"]["gd_fodder_based_diet"]["cmg-18"]],

        "CARGILL Milkogen (8000)-22% CP": [data['modelData']["diet"]["ms_based_diet"]["cmg-22"],
                                           data['modelData']["diet"]["gd_fodder_based_diet"]["cmg-22"]],

        "Dairy Fortune (**Note : in Grams )": [data['modelData']["diet"]["ms_based_diet"]["dairy-fortune"],
                                               data['modelData']["diet"]["gd_fodder_based_diet"]["dairy-fortune"]],
    }

    
    general_health_translations = {
        "hi": {
            "skin-coat": "त्वचा की परत",
            "worm-load": "कीड़े का भार",
            "udder-type": "थन का प्रकार",
            "teat-score": "थन का स्कोर",
            "rumination-status": "जुगाली स्थिति",
        },
        "kn": {
            "skin-coat": "ಚರ್ಮದ ಮೈಕಾಂತಿಯ ಸ್ಥಿತ",
            "worm-load": "ಜಂತುಹುಳು ಬಾದೆಯ ವಿವರ",
            "udder-type": "ಕೆಚ್ಚಲಿನ ವಿಧದ ವಿವರ",
            "teat-score": "ಕೆಚ್ಚಲಿನ ಎತ್ತೊಟ್ಟಿನ ಸಾಮರ್ಥ್ಯದ ಅಂಕ",
            "rumination-status": "ಮೆಲಕು ಹಾಕುವ ವಿವರ",             
        }
    }

    animal_disease_translations = {
        "hi": {
            "diarrhea": "पाचन तंत्र - दस्त",
            "mastitis": "थन और स्तन प्रणाली - दूध में सूजन",
            "flea-bite": "त्वचा और संवेदी अंग - पिस्सू/]टिक काटने से एलर्जी",
            "milk-fever": "चयापचय विकार - दूध बुखार/हाइपोकैल्सीमिया",
            "lsd": "वायरल बीमारियां - खुरपका-मुंहपका रोग (एफएमडी) , लंपी त्वचा रोग (एलएसडी)"
        },
        "kn": {
            "diarrhea": "ಜೀರ್ಣಾಂಗ ವ್ಯವಹಾರಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ವಿವರ - ಬೇದಿ/ತೆಳುವಾದ ಸಗಣ",
            "mastitis": "ಕೆಚ್ಚಲಿಗೆ ಸಂಬಂಧಿಸಿದ ಸಮೃದ್ಧಿಯ ವಿವರ - ಕೆಚ್ಚಲು ಬಾವು / ಗುಪ್ತ ಬಾವು",
            "flea-bite": "ಚರ್ಮ ಸಂಬಂಧಿ ಸಮೃದ್ಧಿಗಳು - ಉಣ್ಣೆ/ಚಿಗಟ ಕಚ್ಚುವಿಕೆಯ ಅಲರ್ಜಿ",
            "milk-fever": "ಚಯಾಪಚಯ ಯಂತ್ರದ ಅಸ್ವಸ್ಥತೆ - ಹಾಲು ಜ್ವರ (ಮಿಲ್ಕ್ ಫೀವರ್)",
            "lsd": "ವೈರಸ್ ನಿಂದ ಹರಡುವ ರೋಗಗಳು - ಕಾಲು-ಬಾಯಿ ಜ್ವರ (FMD), ಚರ್ಮಗಂಟು ರೋಗ"
        }
    }


    diet_data_translations={
        "hi":{
            "Maize silage":"मक्का साइलेज",

            "Green Maize Fodder":"हरी मक्का चारा",

            "Ragi Straw/Wheat Straw/Paddy Straw":"रागी पुआल/गेहूं पुआल/धान पुआल",

            "Green Fodder( BNH-11-14/Super Napier/COFS 29,30)":"हरा चारा (बीएनएच-10, 11 &14/सुपर नेपियर/सीओएफएस 29, 30/बहु-कट चारा",
            
            "Cotton seed cake":"कपास बीज खली",
        
            "Maize cracked":"मक्का साइलेज",
            
            "Groundnut cake":"मूंगफली खली",
            
            "CARGILL Milkogen (8000)-18-20% CP":"मवेशी चारा 18-20% सी.पी",
            
            "CARGILL Milkogen (8000)-22% CP":"मवेशी चारा 22% सी.पी.",
            
            "Dairy Fortune (**Note : in Grams )":"डेयरी फॉर्च्यून (संपूर्ण फ़ीड सप्लीमेंट)",
        },
        "kn":{
            "Maize silage":"ಜೋಳದ ಸೈಲೆಜ್",

            "Green Maize Fodder":"ಹಸಿರು ಜೋಳದ ಮೇವು",

            "Ragi Straw/Wheat Straw/Paddy Straw":"ರಾಗಿ ಹುಲ್ಲು / ಗೋಧಿ ಹುಲ್ಲು / ಭತ್ತದ ಹುಲ್ಲು",

            "Green Fodder( BNH-11-14/Super Napier/COFS 29,30)":"ಹಸಿರು ಮೇವು (BNH-11-14 / ಸೂಪರ್ ನೇಪಿಯರ್ / COFS 29, 30)",
            
            "Cotton seed cake":"ಹತ್ತಿಕಾಳು ಹಿಂಡ",
        
            "Maize cracked":"ಮೆಕ್ಕೆ ಜೋಳದ ಪುಡ",
            
            "Groundnut cake":"ಕಡಲೆಕಾಯಿ ಹಿಂಡ",
            
            "CARGILL Milkogen (8000)-18-20% CP":"ಪಶು ಆಹಾರ (18-20% ಕಚ್ಚಾ ಪ್ರೊಟೀನ್)",
            
            "CARGILL Milkogen (8000)-22% CP":"ಪಶು ಆಹಾರ (22% ಕಚ್ಚಾ ಪ್ರೊಟೀನ್)",
            
            "Dairy Fortune (**Note : in Grams )":"ಡೈರಿ ಫಾರ್ಮ್ಯೂಲೇಷನ್ (Complete Feed Supplement)",
        }
    }



    lang=data["lang"]
    if lang=="en":

        template = env.get_template('templateEN.html')


        rendered_html = template.render(

            farmer_details=data['farmer-details'],
            animal_details=data['animal-details'],
            animal_economic_status=data['animal-economic-status'],
            diet=diet_data,
            general_health_condition=data['general-health-condition'],

            system_of_disorder=data['system-of-disorder'],
            
            general_health_conditions_style=general_health_conditions_style , # Pass the conditions to the template

            animal_disease_style=animal_disease_style,
        )

    else:
        template = env.get_template(f'template{lang.upper()}.html')


        rendered_html = template.render(

            farmer_details=data['farmer-details'],
            animal_details=data['animal-details'],
            animal_economic_status=data['animal-economic-status'],
            diet=diet_data,
            general_health_condition=data['general-health-condition'],

            system_of_disorder=data['system-of-disorder'],
            
            general_health_conditions_style=general_health_conditions_style , # Pass the conditions to the template

            animal_disease_style=animal_disease_style,

            general_health_translations=general_health_translations[lang],  # Pass the Hindi translations
            animal_disease_translations=animal_disease_translations[lang],
            diet_data_translations=diet_data_translations[lang]

        )

    pdf_buffer = io.BytesIO()
    HTML(string=rendered_html, base_url='base_url').write_pdf(pdf_buffer)
    pdf_buffer.seek(0)  # Go back to the beginning of the BytesIO buffer

    return StreamingResponse(pdf_buffer, media_type="application/pdf",
                             headers={"Content-Disposition": "attachment; filename=report.pdf"})
