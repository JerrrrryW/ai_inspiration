import spacy
import csv
import json

# 加载英文的中等大小的模型
nlp = spacy.load('en_core_web_md')

# 计算两个字符串的相似度
def calculate_similarity(text1, text2):
    # 将字符串转换为文档
    doc1 = nlp(text1)
    doc2 = nlp(text2)
    # 计算相似度
    similarity = doc1.similarity(doc2)
    return similarity

if __name__ == '__main__':
    task_words = ['bed', 'creative', 'design', 'novel']
    # image_description = [
    #     'Innovative modern kitchen sink design, blending cutting-edge technology with elegant style.',
    #     'Futuristic bathroom sink with smart temperature control and automatic cleaning features.',
    #     'Eco-friendly outdoor sink design using renewable materials and rainwater harvesting system.'
    # ]

    # 读取csv
    image_description = []
    with open('public/pyscript/inspiration-images.csv', 'r') as f:
        reader = csv.reader(f)
        for row in reader:
            image_description.append(row[:3])
    
    

    # 计算相似度并排序
    similarity_list = []
    for description in image_description:
        if description[0] == task_words[0]:
            similarity = calculate_similarity(' '.join(task_words), description[2])
            similarity_list.append([similarity, description[1]])

    sorted_similarity_list = sorted(similarity_list, reverse=True)
    # 输出结果，保存到json文件,包含序号、图片名、相似度
    result = {}
    for i in range(len(sorted_similarity_list)):
        result[i] = [sorted_similarity_list[i][1], sorted_similarity_list[i][0]]
    with open('public/pyscript/bed_result.json', 'w') as f:
        json.dump(result, f)
    