import google.generativeai as genai

genai.configure(api_key="AQ.Ab8RN6LI-AB_vlb_zt7l5A1U_Dl635ph00EOz6eRyiETV9zuQw")

model = genai.GenerativeModel("gemini-2.0-flash")

response = model.generate_content("Hello")

print(response.text)