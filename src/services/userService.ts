// User Service - Mock implementation for future API integration

export interface UserData {
  id: string;
  nome: string;
  email: string;
  genero: 'Masculino' | 'Feminino' | 'Outro' | 'Prefiro não informar';
  dataNascimento: {
    dia: string;
    mes: string;
    ano: string;
  };
  estado: string;
  cidade: string;
  telefone?: string;
  cpf?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  nome?: string;
  email?: string;
  genero?: string;
  dataNascimento?: {
    dia: string;
    mes: string;
    ano: string;
  };
  estado?: string;
  cidade?: string;
  telefone?: string;
}

// Fake data for development
const mockUserData: UserData = {
  id: '1',
  nome: 'Mariana',
  email: 'Marianamae@gmail.com',
  genero: 'Feminino',
  dataNascimento: {
    dia: '23',
    mes: '12',
    ano: '1998'
  },
  estado: 'SP',
  cidade: 'São Paulo',
  telefone: '11999999999',
  cpf: '123.456.789-00',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
};

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Get current user data
  async getCurrentUser(): Promise<UserData> {
    await delay(500); // Simulate network delay
    
    // In production, this would be:
    // const response = await fetch('/api/user/profile', {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // });
    // return response.json();
    
    return { ...mockUserData };
  },

  // Update user profile
  async updateProfile(data: UpdateUserPayload): Promise<{ success: boolean; user: UserData }> {
    await delay(800); // Simulate network delay
    
    // In production, this would be:
    // const response = await fetch('/api/user/profile', {
    //   method: 'PUT',
    //   headers: { 
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });
    // return response.json();
    
    // Simulate update by merging data
    const updatedUser = {
      ...mockUserData,
      ...data,
      dataNascimento: data.dataNascimento || mockUserData.dataNascimento,
      updatedAt: new Date().toISOString()
    };
    
    return {
      success: true,
      user: updatedUser
    };
  },

  // Reset password
  async resetPassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    await delay(1000); // Simulate network delay
    
    // In production, this would be:
    // const response = await fetch('/api/user/reset-password', {
    //   method: 'POST',
    //   headers: { 
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ currentPassword, newPassword })
    // });
    // return response.json();
    
    // Simulate password validation
    if (currentPassword.length < 6) {
      throw new Error('Senha atual incorreta');
    }
    
    if (newPassword.length < 8) {
      throw new Error('A nova senha deve ter pelo menos 8 caracteres');
    }
    
    return {
      success: true,
      message: 'Senha atualizada com sucesso'
    };
  },

  // Delete account
  async deleteAccount(password: string): Promise<{ success: boolean; message: string }> {
    await delay(1500); // Simulate network delay
    
    // In production, this would be:
    // const response = await fetch('/api/user/delete', {
    //   method: 'DELETE',
    //   headers: { 
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ password })
    // });
    // return response.json();
    
    // Simulate password validation
    if (!password || password.length < 6) {
      throw new Error('Senha incorreta');
    }
    
    return {
      success: true,
      message: 'Conta deletada com sucesso'
    };
  },

  // Validate email availability
  async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    await delay(300); // Simulate network delay
    
    // In production, this would be:
    // const response = await fetch(`/api/user/check-email?email=${email}`);
    // return response.json();
    
    // Simulate email check
    const unavailableEmails = ['admin@gmail.com', 'teste@gmail.com'];
    
    return {
      available: !unavailableEmails.includes(email.toLowerCase())
    };
  }
};

// Brazilian states for dropdown
export const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

// Gender options for dropdown
export const genderOptions = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Feminino', label: 'Feminino' },
  { value: 'Outro', label: 'Outro' },
  { value: 'Prefiro não informar', label: 'Prefiro não informar' }
];

// Month options for dropdown
export const monthOptions = [
  { value: '01', label: 'Janeiro' },
  { value: '02', label: 'Fevereiro' },
  { value: '03', label: 'Março' },
  { value: '04', label: 'Abril' },
  { value: '05', label: 'Maio' },
  { value: '06', label: 'Junho' },
  { value: '07', label: 'Julho' },
  { value: '08', label: 'Agosto' },
  { value: '09', label: 'Setembro' },
  { value: '10', label: 'Outubro' },
  { value: '11', label: 'Novembro' },
  { value: '12', label: 'Dezembro' }
];