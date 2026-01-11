import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def handler(event: dict, context) -> dict:
    '''API endpoint для отправки заявок на финансирование на email'''
    
    method = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body = json.loads(event.get('body', '{}'))
        
        company = body.get('company', '')
        inn = body.get('inn', '')
        revenue = body.get('revenue', '')
        marketplaces = body.get('marketplaces', '')
        phone = body.get('phone', '')
        email = body.get('email', '')
        comment = body.get('comment', '')
        
        if not all([company, inn, revenue, marketplaces, phone, email]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Заполните все обязательные поля'}),
                'isBase64Encoded': False
            }
        
        smtp_host = os.environ.get('SMTP_HOST')
        smtp_port = int(os.environ.get('SMTP_PORT', '465'))
        smtp_user = os.environ.get('SMTP_USER')
        smtp_password = os.environ.get('SMTP_PASSWORD')
        recipient_email = 'pupg1996@mail.ru'
        
        if not all([smtp_host, smtp_user, smtp_password]):
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'SMTP не настроен'}),
                'isBase64Encoded': False
            }
        
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка на финансирование от {company}'
        msg['From'] = smtp_user
        msg['To'] = recipient_email
        
        current_time = datetime.now().strftime('%d.%m.%Y %H:%M')
        
        html_content = f"""
        <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                .header {{ background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }}
                .header h1 {{ margin: 0; font-size: 24px; }}
                .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }}
                .field {{ margin-bottom: 20px; }}
                .field-label {{ font-weight: 600; color: #64748b; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }}
                .field-value {{ font-size: 16px; color: #1e293b; background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #0ea5e9; }}
                .footer {{ margin-top: 20px; padding-top: 20px; border-top: 2px solid #e2e8f0; color: #64748b; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>📋 Новая заявка на финансирование</h1>
                    <p style="margin: 5px 0 0 0; opacity: 0.9;">Получена {current_time}</p>
                </div>
                <div class="content">
                    <div class="field">
                        <div class="field-label">Название компании</div>
                        <div class="field-value">{company}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">ИНН</div>
                        <div class="field-value">{inn}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Месячный оборот</div>
                        <div class="field-value">{revenue}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Маркетплейсы</div>
                        <div class="field-value">{marketplaces}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Телефон</div>
                        <div class="field-value">{phone}</div>
                    </div>
                    
                    <div class="field">
                        <div class="field-label">Email</div>
                        <div class="field-value">{email}</div>
                    </div>
                    
                    {f'<div class="field"><div class="field-label">Комментарий</div><div class="field-value">{comment}</div></div>' if comment else ''}
                    
                    <div class="footer">
                        Заявка отправлена автоматически через форму на сайте
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)
        
        if smtp_port == 465:
            server = smtplib.SMTP_SSL(smtp_host, smtp_port)
        else:
            server = smtplib.SMTP(smtp_host, smtp_port)
            server.starttls()
        
        server.login(smtp_user, smtp_password)
        server.send_message(msg)
        server.quit()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'success': True, 'message': 'Заявка успешно отправлена'}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка отправки: {str(e)}'}),
            'isBase64Encoded': False
        }
