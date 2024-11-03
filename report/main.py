from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
import io

# To run - uvicorn generate:app --reload

app = FastAPI()


@app.post("/api")
async def create_report(request: Request):
    data = await request.json()

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


    # Translation mapping for health conditions
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

    # Translation mapping for diseases
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

    # Translation mapping for Diet data
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

    # Select template according to the language provided
    lang = data["lang"]
    if lang == "en":
        template = env.get_template('templateEN.html')

        rendered_html = template.render(
            farmer_details=data['farmer-details'],
            animal_details=data['modelData']['animal-details'],
            animal_economic_status=data['modelData']['animal-economic-status'],
            diet=diet_data,
            general_health_condition=data['modelData']['general-health-condition'],
            system_of_disorder=data['modelData']['system-of-disorder'],
            general_health_conditions_style=general_health_conditions_style,
            animal_disease_style=animal_disease_style,
        )

    else:
        template = env.get_template(f'template{lang.upper()}.html')

        rendered_html = template.render(
            farmer_details=data['farmer-details'],
            animal_details=data['modelData']['animal-details'],
            animal_economic_status=data['modelData']['animal-economic-status'],
            diet=diet_data,
            general_health_condition=data['modelData']['general-health-condition'],
            system_of_disorder=data['modelData']['system-of-disorder'],
            general_health_conditions_style=general_health_conditions_style,
            animal_disease_style=animal_disease_style,
            general_health_translations=general_health_translations[lang],
            animal_disease_translations=animal_disease_translations[lang],
            diet_data_translations=diet_data_translations[lang]

        )

    pdf_buffer = io.BytesIO()
    HTML(string=rendered_html, base_url='base_url').write_pdf(pdf_buffer)
    pdf_buffer.seek(0)

    return StreamingResponse(pdf_buffer, media_type="application/pdf",
                             headers={"Content-Disposition": "attachment; filename=report.pdf"})
